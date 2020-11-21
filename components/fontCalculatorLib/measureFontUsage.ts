
const measureFontUsage = function (fontParams : string, fontCDNURL : string, fontMeasureURL : string, fontMeasureInterval : number) {
    return `
<script>
((e, t, k, n) => {
    'use strict'; var c = document, r = c.createElement('link');
    var a = k+'?url=' + encodeURIComponent(c.URL), s = t + '/' + a, l = e + '/' + a;
    r.rel = 'stylesheet'; r.href = s; c.head.appendChild(r);
    var f = () => {fetch(l, {importance: 'low', credentials: 'include'})};
    window.addEventListener('load', () => {f(), setInterval(f, 1e3 * n)})
})('${fontMeasureURL}',
   '${fontCDNURL}',
   '${fontParams}', 60);
</script>
`.trim()
}

export default measureFontUsage

