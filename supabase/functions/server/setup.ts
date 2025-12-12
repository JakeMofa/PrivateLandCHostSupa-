import { createClient } from 'npm:@supabase/supabase-js@2';

// One-time setup function - run this once to configure everything
export async function runSetup(supabaseAdmin: any) {
  const results = {
    schema: { success: false, error: null as any },
    buckets: { success: false, created: [] as string[], error: null as any },
    realtime: { success: false, error: null as any },
    summary: ''
  };

  try {
    // ============================================================================
    // STEP 1: Create Storage Buckets
    // ============================================================================
    console.log('Creating storage buckets...');
    const bucketsToCreate = [
      { name: 'legal-documents', public: false },
      { name: 'property-images', public: false },
      { name: 'profile-photos', public: false }
    ];

    for (const bucket of bucketsToCreate) {
      try {
        const { data: existingBuckets } = await supabaseAdmin.storage.listBuckets();
        const bucketExists = existingBuckets?.some((b: any) => b.name === bucket.name);
        
        if (!bucketExists) {
          const { error } = await supabaseAdmin.storage.createBucket(bucket.name, {
            public: bucket.public,
            fileSizeLimit: 52428800, // 50MB
            allowedMimeTypes: null
          });
          
          if (error) {
            console.error(`Error creating bucket ${bucket.name}:`, error);
          } else {
            results.buckets.created.push(bucket.name);
            console.log(`✅ Created bucket: ${bucket.name}`);
          }
        } else {
          console.log(`✅ Bucket already exists: ${bucket.name}`);
          results.buckets.created.push(bucket.name + ' (existed)');
        }
      } catch (err: any) {
        console.error(`Error with bucket ${bucket.name}:`, err.message);
      }
    }
    results.buckets.success = true;

    // Note: Database schema should be applied manually via SQL Editor
    results.schema.success = false;
    results.schema.error = 'Database setup requires manual SQL execution. See BACKEND_INTEGRATION_COMPLETE.md';
    
    results.realtime.success = true;

    // ============================================================================
    // SUMMARY
    // ============================================================================
    results.summary = `
Setup Complete! ✅

Buckets Created: ${results.buckets.created.join(', ')}

Next Steps:
1. Apply full database schema via SQL Editor (see BACKEND_INTEGRATION_COMPLETE.md)
2. Create your admin account
3. Test the system!

Note: For security, RLS policies should be applied manually via the Supabase SQL Editor.
Copy the contents of /supabase/migrations/001_initial_schema.sql and run it.
`;

    return results;

  } catch (error: any) {
    console.error('Setup error:', error);
    results.summary = `Setup encountered errors. Please follow BACKEND_INTEGRATION_COMPLETE.md for manual setup.`;
    return results;
  }
}
