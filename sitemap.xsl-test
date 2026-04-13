<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>MRVS Sitemap</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f7;
            color: #1d1d1f;
            padding: 40px 20px;
          }
          .container { max-width: 800px; margin: 0 auto; }
          h1 {
            font-size: 32px;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 8px;
          }
          .subtitle {
            font-size: 14px;
            color: #86868b;
            margin-bottom: 32px;
          }
          .count {
            display: inline-block;
            background: #0071e3;
            color: white;
            font-size: 12px;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 20px;
            margin-bottom: 24px;
          }
          table {
            width: 100%;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            border: 1px solid #d2d2d730;
          }
          thead th {
            background: #1d1d1f;
            color: white;
            text-align: left;
            padding: 14px 20px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          tbody td {
            padding: 14px 20px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 14px;
          }
          tbody tr:last-child td { border-bottom: none; }
          tbody tr:hover { background: #f5f5f7; }
          .url {
            color: #0071e3;
            text-decoration: none;
            word-break: break-all;
            font-family: 'SF Mono', Monaco, monospace;
            font-size: 13px;
          }
          .url:hover { text-decoration: underline; }
          .priority {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 600;
          }
          .p-high { background: #30d15820; color: #248a3d; }
          .p-med  { background: #ff9f0a20; color: #c77c00; }
          .p-low  { background: #86868b20; color: #86868b; }
          .freq {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 600;
            background: #f5f5f7;
            color: #86868b;
            text-transform: capitalize;
          }
          .footer {
            margin-top: 24px;
            font-size: 12px;
            color: #86868b;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sitemap</h1>
          <p class="subtitle">Multi-Religion Election System — multireligionvalsystem.eu.org</p>
          <span class="count">
            <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
          </span>
          <table>
            <thead>
              <tr>
                <th style="width:60%">URL</th>
                <th style="width:15%">Last Modified</th>
                <th style="width:12%">Frequency</th>
                <th style="width:13%">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a class="url" href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td style="font-size:13px; color:#86868b;">
                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                  </td>
                  <td>
                    <span class="freq">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </span>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt;= 0.8">
                        <span class="priority p-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority &gt;= 0.5">
                        <span class="priority p-med"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority p-low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <p class="footer">Generated for Google, Bing, and other search engines</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
