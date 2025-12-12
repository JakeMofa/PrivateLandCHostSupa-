// Test Gmail SMTP connection
async function testGmailSMTP() {
  const gmailUser = 'insurancequotademo@gmail.com';
  const gmailPassword = 'dwhzyblnrvvdvbwn'; // Spaces removed
  const testEmail = 'adambtoth1@gmail.com';
  
  console.log('Testing Gmail SMTP connection...');
  console.log('From:', gmailUser);
  console.log('To:', testEmail);
  
  try {
    const encoder = new TextEncoder();
    const emailContent = `From: PrivateLand <${gmailUser}>
To: ${testEmail}
Subject: Test Email from PrivateLand
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8

<h1>Test Email</h1>
<p>If you receive this, Gmail SMTP is working!</p>`;
    
    const data = encoder.encode(emailContent);
    
    console.log('\n1. Connecting to smtp.gmail.com:587...');
    const conn = await Deno.connect({
      hostname: 'smtp.gmail.com',
      port: 587,
    });
    
    console.log('✅ Connected to SMTP server');
    
    console.log('\n2. Starting TLS...');
    const tls = await Deno.startTls(conn, { hostname: 'smtp.gmail.com' });
    console.log('✅ TLS established');
    
    const reader = tls.readable.getReader();
    const writer = tls.writable.getWriter();
    const decoder = new TextDecoder();
    
    // Helper function
    const sendCommand = async (cmd: string) => {
      console.log('>', cmd.substring(0, 50));
      await writer.write(encoder.encode(cmd + '\r\n'));
      const { value } = await reader.read();
      const response = decoder.decode(value || new Uint8Array());
      console.log('<', response.trim());
      return response;
    };
    
    console.log('\n3. SMTP handshake...');
    await reader.read(); // greeting
    await sendCommand('EHLO localhost');
    
    console.log('\n4. Authenticating...');
    await sendCommand('AUTH LOGIN');
    await sendCommand(btoa(gmailUser));
    await sendCommand(btoa(gmailPassword));
    
    console.log('\n5. Sending email...');
    await sendCommand(`MAIL FROM:<${gmailUser}>`);
    await sendCommand(`RCPT TO:<${testEmail}>`);
    await sendCommand('DATA');
    await writer.write(data);
    await sendCommand('\r\n.');
    
    console.log('\n6. Closing connection...');
    await sendCommand('QUIT');
    
    reader.releaseLock();
    writer.releaseLock();
    conn.close();
    
    console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
    console.log(`Check ${testEmail} inbox`);
    
  } catch (error) {
    console.error('\n❌ ERROR:', error);
  }
}

testGmailSMTP();
