module.exports = (toName, fromName, url, note) => `
<head>
  <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- Web Font / @font-face : BEGIN -->
	<!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
        <style>
            * {
                font-family: sans-serif !important;
            }
        </style>
    <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
        <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

	<!-- CSS Reset -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin:0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }
        table table table {
            table-layout: auto;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: A work-around for iOS meddling in triggered links. */
        *[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
        }

        /* What it does: A work-around for Gmail meddling in triggered links. */
        .x-gmail-data-detectors,
        .x-gmail-data-detectors *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
        }

        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */
        .a6S {
	        display: none !important;
	        opacity: 0.01 !important;
        }
        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
	        display:none !important;
	   	}

        /* What it does: Prevents underlining the button text in Windows 10 */
        .button-link {
            text-decoration: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */
        /* Thanks to Eric Lepetit @ericlepetitsf) for help troubleshooting */
        @media (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
            .email-container {
                min-width: 375px !important;
            }
        }

    </style>

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
			<o:AllowPNG/>
			<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->

    <!-- Progressive Enhancements -->
    <style>

        /* What it does: Hover styles for buttons */
        .button-link {
            transition: all 100ms ease-in;
        }
        .button-link:hover {
            background: #3fbc70 !important;
            border-color: #3fbc70 !important;
        }

    </style>
</head>
<body>
<div style="background-color:#fff;margin:0 auto 0 auto;padding:30px 0 30px 0;color:#4f565d;font-size:13px;line-height:20px;font-family:'Helvetica Neue',Arial,sans-serif;text-align:left;">
  <center>
    <table style="max-width:550px;text-align:center">
      <tbody>
        <tr>
          <td style="padding:0 0 20px 0;border-bottom:1px solid #e9edee;">
            <a href="https://www.luvpay.io/" style="display:block; margin:0 auto;" target="_blank">
              <img src="https://www.luvpay.io/images/logo/luvpay-logo-100.png" width="75" height="75" alt="LuvPay logo" style="border: 0px;">
            </a>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding:30px 0;">
            <p style="color:#1d2227;line-height:28px;font-size:22px;margin:12px 10px 20px 10px;font-weight:400;">Hi ${toName},</p>
            <p style="margin:0 10px 10px 10px;padding:0;"><b>${fromName}</b> started a luv on luvpay!</p>
            <p style="margin:0 10px 10px 10px;padding:0;"><b>${fromName}</b>: <i>${note || 'Check it out!'}</i></p>
            <p style="margin:0 10px 10px 10px;padding:0;">Click here to contribute:</p>
            <p>
              <a class="button-link" style="display:inline-block;text-decoration:none;padding:15px 20px;background-color:#70cf95;border:1px solid #70cf95;border-radius:3px;color:#FFF;font-weight:bold;" href=${url} target="_blank">Show Some Luv!</a>
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding:30px 0 0 0;border-top:1px solid #e9edee;color:#9b9fa5">
            This message was sent on luvpay.io
          </td>
        </tr>
      </tbody>
    </table>
  </center>
</div>
</body>
`
