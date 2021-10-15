# FQT

> Tiny (67 lines of code!) template engine with the same syntax as EJS.

FQT is a template engine with the same syntax as [EJS](https://ejs.co/). It only supports the two most important EJS tags: `<%` and `<%=`. Another difference is that FQT does not automatically HTML-escape values in `<%=` tags.

This is more of an experiment of mine.

## Try it

If you want to try it anyway, you can install FQT as follows:

```
npm install --global fqt
```

Then use it like this:

```
fqt <template file> <JSON data file> <output file>
```
