import { h } from "preact"

const Footer = () => (
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>SPC online</strong> by{" "}
          <a href="https://carloseng.com">Carlos Silva</a>
          . This website is part of my other projects{" "}
          <a href="https://github.com/carlosqsilva/pyspc">pyspc</a>, a python
          library for plottting statistical process control charts. The source
          code avaiable on{" "}
          <a href="https://github.com/carlosqsilva/ccharts-online">Github</a>{" "}
          licensed under{" "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
