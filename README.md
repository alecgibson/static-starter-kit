# Static website starter kit

This starter kit is designed to make the creation of static webpages
both easier and awesomer. It uses:

- [Nunjucks](https://mozilla.github.io/nunjucks/) for HTML templating
- [Sass](http://sass-lang.com/) for CSS pain alleviation
- [Gulp](http://gulpjs.com/) for workflow awesomeness:
  - Compile Nunjucks templates into static HTML pages
  - Compile Sass into minified CSS
  - Concatenate and minify JavaScript
  - Run a local server for previewing your output, with auto reload
    to see live changes as you type
  

## Installation

### npm

If you don't have it already, you'll have to install `npm`. Follow
the instructions here: 
[https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)

### Gulp

Once you have `npm` installed you can install Gulp globally with:

```bash
npm install -g gulp
```

### Dependencies

Install the rest of the dependencies by opening a shell at the root
of the project directory and running:

```bash
npm install
```

## Running

You can get up and running immediately by opening a shell at the
root of the project directory and running:

```bash
gulp run
```

Then visit [http://localhost:8080](http://localhost:8080)

You should see the "Hello, World!" website. Congratulations! You're
already up and running!


## Project structure

Now that you're up and running, let's explore the project structure.
At the top of your project directory you should see these (amongst 
some other files/folders):

```
.
├── dist
├── src
├── gulpfile.js
└── package.json
```

- `dist` is the "distribution" folder. This is where the compiled
  static website is put, and this is the folder that you should
  upload to your web server to display your finished website.  
  **Do not make changes in this folder - they will be overwritten**
- `src` is the "source" folder. This is where all your Nunjucks
  templates, Sass files and non-minified JavaScript lives.  
  **This is where you should make changes**
- `gulpfile.js` is the definition of the Gulp tasks. If you need to
  tweak anything about how the website is built, look here. For example,
  whenever you add a new JavaScript file, you'll need to add it to the
  list of source files in the `javascript` task (these files are
  explicitly listed, because the ordering is important)
- `package.json` is the `npm` list of dependencies. If you need to
  use any other Node.js packages, you can add them here.
  
### `src`
 
The `src` directory is where all the code happens! Let's look at it
in a bit more depth:

```
.
├── src
    ├── assets
    |   ├── images
    |   |    └── hello.gif
    |   ├── javascript
    |   |   └── jquery.min.js
    |   └── style
    |       └── application.scss
    ├── pages
    |   ├── about
    |   |   └── index.html
    |   ├── home.js
    |   ├── home.scss
    |   └── index.html
    └── templates
        ├── base
        |   ├── base.html
        |   └── base.scss
        ├── macros
        |   └── navigation
        |       ├── navigation.html
        |       └── navigation.scss
        └── partials
            └── header
                ├── header.html
                └── header.scss
```

Let's start at the top and work our way down:

- `assets` is where you put things that might apply to the whole
  page, like JavaScript libraries (eg jQuery), or the stylesheet
  for your whole website
- `pages` is where definitions for your actual web pages go
- `templates` is where reusable bits of web pages go

#### `assets`

The `assets` directory is home to things that apply to the whole
website, like JavaScript libraries (eg jQuery) or the stylesheet
for the whole website.

Here you'll see the `application.scss` file, which is where you
should define styles that effect your entire website (eg if you
wanted to style all links, you'd probably do that here). 
`application.scss` is also where you should list all the other
little Sass files you have in your `pages` and `templates`
directories.

#### `pages`

If you have a look in the `pages` directory, you'll see we have
two pages. They're both called `index.html`. `index.html` is usually
the default page loaded when you point a URL to a directory, and
it means we can have URLs like `/about` instead of `/about.html`

You should also notice that the pages are nicely grouped with their
own style sheets and JavaScript. This means we keep files small,
and keep them near the other files they interact with - it's much
easier to understand them all in these little chunks.

#### `templates`

In the `templates` directory we have lots of reusable bits of code.
We've defined `base.html`, which you'll see is an empty shell of an
HTML document. You'll see we've got a couple of Nunjucks 
[blocks](https://mozilla.github.io/nunjucks/templating.html#block),
where other pages can insert HTML.

It also
[includes](https://mozilla.github.io/nunjucks/templating.html#include)
a partial that represents the page header. Including templates like
this promotes template reuse, and helps to keep our HTML concise
and understandable.

Finally, we have a `macros` folder in here, which contains a
`navigation`
[macro](https://mozilla.github.io/nunjucks/templating.html#macro).
This macro gives us reusable code similar to the header partial, but
also allows us to send the partial some options (in this case
which page to highlight as the "active" page).

## Making changes

### Adding JavaScript files

If you add new JavaScript files, make sure you list them in the order
you want them in the `javascript` task in `gulpfile.js`. For example,
if you write JavaScript that relies on jQuery, make sure that file is
listed after jQuery. You'll need to restart Gulp to see the changes.

### Adding Sass files

If you add new Sass files, make sure you list them in `application.scss`,
or include them in the `sass` task in `gulpfile.js`. If you modify
`gulpfile.js` you'll need to restart Gulp to see the changes.
