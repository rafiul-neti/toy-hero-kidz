export const orderInvoiceTemplate = ({ orderId, items, grandTotal }) => {
  const primaryColor = "#fc4000";
  const date = new Date().toLocaleDateString("bn-BD");
  const logoUrl = "https://i.ibb.co.com/WvCmbkBw/image.png";

  return `
    <div dir="ltr" style="background-color: #f9f9f9; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        
        <tr>
          <td style="padding: 30px 20px; text-align: center; border-bottom: 4px solid ${primaryColor};">
            <table align="center" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 10px;">
                  <img src="${logoUrl}" alt="Hero Kidz Logo" width="50" height="40" style="display: block; border: 0;">
                </td>
                <td style="vertical-align: middle;">
                  <h2 style="margin: 0; font-size: 28px; font-weight: bold; color: #333333; line-height: 1;">
                    Hero<span style="color: ${primaryColor};">Kidz</span>
                  </h2>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 40px 30px 20px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; color: #333333;">অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে! 🎉</h1>
            <p style="margin: 10px 0 0 0; font-size: 15px; color: #666666;">আপনার পছন্দের পণ্যগুলো দ্রুত পৌঁছে দিতে আমরা কাজ শুরু করেছি।</p>
          </td>
        </tr>

        <tr>
          <td style="padding: 20px 30px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border-radius: 12px; padding: 20px;">
              <tr>
                <td style="padding-bottom: 15px;">
                  <span style="font-size: 12px; color: #999999; text-transform: uppercase;">অর্ডার আইডি:</span><br>
                  <strong style="font-size: 15px; color: #333333;">#${orderId}</strong>
                </td>
                <td align="right" style="padding-bottom: 15px;">
                  <span style="font-size: 12px; color: #999999; text-transform: uppercase;">তারিখ:</span><br>
                  <strong style="font-size: 15px; color: #333333;">${date}</strong>
                </td>
              </tr>
              
              <tr><td colspan="2" style="border-top: 1px solid #eeeeee; padding-top: 15px;"></td></tr>

              ${items
                .map(
                  (item) => `
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #444444;">
                    ${item.title} <span style="color: #888888;">x ${item.quantity}</span>
                  </td>
                  <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #333333;">
                    ৳${item.price}
                  </td>
                </tr>
              `,
                )
                .join("")}

              <tr><td colspan="2" style="border-top: 1px solid #eeeeee; margin: 15px 0; padding-top: 15px;"></td></tr>
              
              <tr>
                <td style="font-size: 18px; font-weight: bold; color: #333333;">মোট মূল্য:</td>
                <td align="right" style="font-size: 22px; font-weight: 900; color: ${primaryColor};">৳${grandTotal}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 30px 40px 30px; text-align: center;">
            <p style="font-size: 13px; color: #888888; line-height: 1.6;">
              যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিমে যোগাযোগ করুন:<br>
              <span style="color: ${primaryColor}; font-weight: bold;">+880 1987654321</span>
            </p>
            <div style="margin-top: 25px;">
                <a href="https://your-domain.com" style="background-color: ${primaryColor}; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">অর্ডার ট্র্যাক করুন</a>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
};
