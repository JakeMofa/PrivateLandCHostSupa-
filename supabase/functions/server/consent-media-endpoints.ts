// ============================================================================
// CONSENT: Submit new client consent from Add Listing page
// ============================================================================
app.post("/consents/submit-with-listing", async (c) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  try {
    // Authenticate user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Verify broker role
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userData?.role !== 'broker') {
      return c.json({ error: 'Only brokers can submit consents' }, 403);
    }

    // Parse form data
    const formData = await c.req.formData();
    const clientName = formData.get('client_name') as string;
    const clientEmail = formData.get('client_email') as string;
    const clientPhone = formData.get('client_phone') as string;
    const consentFile = formData.get('consent_file') as File;
    const notes = formData.get('notes') as string;

    // Validate required fields
    if (!clientName?.trim()) {
      return c.json({ error: 'Client name is required' }, 400);
    }

    if (!consentFile) {
      return c.json({ error: 'Consent document file is required' }, 400);
    }

    // Validate file type (PDF or images only)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(consentFile.type)) {
      return c.json({ 
        error: 'Invalid file type. Only PDF and image files are allowed.' 
      }, 400);
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (consentFile.size > maxSize) {
      return c.json({ 
        error: 'File too large. Maximum size is 10MB.' 
      }, 400);
    }

    console.log(`📄 Processing consent submission for client: ${clientName} by broker: ${user.id}`);

    // Upload consent document to storage
    const timestamp = Date.now();
    const fileExtension = consentFile.name.split('.').pop();
    const sanitizedClientName = clientName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const fileName = `${timestamp}_${sanitizedClientName}.${fileExtension}`;
    const filePath = `consent-to-list/${user.id}/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('Legal-documents')
      .upload(filePath, consentFile, {
        contentType: consentFile.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Failed to upload consent document: ${uploadError.message}`);
    }

    console.log(`✅ Consent document uploaded to: ${filePath}`);

    // Create consent record in database
    const { data: consent, error: insertError } = await supabaseAdmin
      .from('client_consents')
      .insert({
        broker_id: user.id,
        client_name: clientName.trim(),
        client_email: clientEmail?.trim() || null,
        client_phone: clientPhone?.trim() || null,
        consent_document_url: filePath,
        consent_document_name: consentFile.name,
        notes: notes?.trim() || null,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      // Clean up uploaded file if database insert fails
      await supabaseAdmin.storage
        .from('Legal-documents')
        .remove([filePath]);
      
      console.error('Database insert error:', insertError);
      throw new Error(`Failed to create consent record: ${insertError.message}`);
    }

    console.log(`✅ Consent record created with ID: ${consent.id}`);

    return c.json({
      success: true,
      consent_id: consent.id,
      client_name: consent.client_name,
      message: 'Consent submitted for admin review. You can continue creating the listing.',
      status: 'pending'
    });

  } catch (error: any) {
    console.error('❌ Consent submission error:', error);
    return c.json({ 
      error: error.message || 'Failed to submit consent',
      details: error.toString()
    }, 500);
  }
});
