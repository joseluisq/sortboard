module.exports.init = () => {
  const tmpl = `
    <ul id="sortlist">
      <li data-filter="black second-line infantry-black">&#9823;</li>
      <li data-filter="black second-line infantry-black">&#9823;</li>
      <li data-filter="black second-line infantry-black">&#9823;</li>
      <li data-filter="black second-line infantry-black">&#9823;</li>
      <li data-filter="black second-line infantry-black">&#9823;</li>
      <li data-filter="black second-line infantry-black">&#9823;</li>
      <li data-filter="black second-line infantry-black">&#9823;</li>
      <li data-filter="black second-line infantry-black">&#9823;</li>

      <li data-filter="black first-line rooks-2">&#9820;</li>
      <li data-filter="black first-line infantry-black">&#9822;</li>
      <li data-filter="black first-line infantry-black">&#9821;</li>
      <li data-filter="black first-line royalty">&#9819;</li>
      <li data-filter="black first-line royalty">&#9818;</li>
      <li data-filter="black first-line infantry-black">&#9821;</li>
      <li data-filter="black first-line infantry-black">&#9822;</li>
      <li data-filter="black first-line rooks-2">&#9820;</li>

      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>

      <li data-filter="white first-line rooks-2">&#9814;</li>
      <li data-filter="white first-line infantry-white">&#9816;</li>
      <li data-filter="white first-line infantry-white">&#9815;</li>
      <li data-filter="white first-line royalty">&#9813;</li>
      <li data-filter="white first-line royalty">&#9812;</li>
      <li data-filter="white first-line infantry-white">&#9815;</li>
      <li data-filter="white first-line infantry-white">&#9816;</li>
      <li data-filter="white first-line rooks-2">&#9814;</li>

      <li data-filter="white second-line infantry-white">&#9817;</li>
      <li data-filter="white second-line infantry-white">&#9817;</li>
      <li data-filter="white second-line infantry-white">&#9817;</li>
      <li data-filter="white second-line infantry-white">&#9817;</li>
      <li data-filter="white second-line infantry-white">&#9817;</li>
      <li data-filter="white second-line infantry-white">&#9817;</li>
      <li data-filter="white second-line infantry-white">&#9817;</li>
      <li data-filter="white second-line infantry-white">&#9817;</li>
    </ul>
  `

  document.body.innerHTML = tmpl
}
