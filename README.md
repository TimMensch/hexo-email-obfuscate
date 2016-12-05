# hexo-email-obfuscate

A plugin to obfuscate emails in Hexo static generated web sites.

## Installation

```
npm install hexo-email-obfuscate --save
```

or (better)

```
yarn add hexo-email-obfuscate
```

If Hexo automatically detects all of your plugins, that's all.

If that is not the case, register the plugin in your `_config.yml` file :
```
plugins:
  - hexo-email-obfuscate
```

## Syntax

### Markdown
``` markdown
[Contact Me](mailto:foo@bar.com)
```

### Output
``` html
<script>
var v1,s1='6k*bxol7(gkcf~e0~cg\'cd~xe\':J{ciaibkxmomkgoy$ieg(4ied~ki~*go6%k4';
for (v1=0;v1<s1.length;++v1) {
    document.write(String.fromCharCode(s1.charCodeAt(v1)^0xA));
}
</script><noscript>contact me [Email Protected]</noscript>
```

The string above is an obfuscation of the "mailto" link.

If you do put a raw email in the "link text" (where is says "Contact Me" in the example), it will
eliminate it from the `<noscript>` block so that the email doesn't appear in the clear in the HTML source.

If you're using [hexo-renderer-markdown-it](https://github.com/celsomiranda/hexo-renderer-markdown-it) with `linkify`
enabled, hexo-email-obfuscate will protect auto-linked emails as well. Since the link text will *be* the email, though,
it will simply replace the email with `[Email Protected]` in the `<noscript>` block.
