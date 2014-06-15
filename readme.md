As the name suggests, this plugin simulates image projection. It works by using two similar images for the original and the projected image. [See the demo](http://widatama.github.io/jquery-imageprojection)

![Image Projection Diagram](images/diagram.jpg "Image Projection Diagram")

Whenever the surface is hovered, the viewfinder and the projected image come up. Everything covered by the viewfinder is shown on the projected image.

##Sample usage

###HTML

Include the scripts.
```html
<script src="javascripts/jquery.min.js"></script>
<script src="javascripts/image.projection.js"></script>
```

Structure the image. Here, overlay acts as the surface. The image used as original and contains the url for projection.
```html
<div class="wrap">
  <div class="overlay"></div>
  <img src="images/sample-halved.jpg" id="sampleimg" data-pimg="images/sample.jpg" />
</div>
```

###Javascript

Initiate the projection.
```javascript
$(".wrap .overlay").imageProjection($("#sampleimg"));
```

##License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.