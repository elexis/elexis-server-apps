This directory contains the sourcecode for the Elexis Server App Programmer's Handbook. Contribution is welcome.

The source files are simply Markdown files (*.md). There are a few extra markups as defined in style.css.

You can convert the source with pandoc in different formats such as epub, pdf, html and so on. the script *build.sh* creates an ebook in epub-3-format which should be compatible with most readers..

## Some useful markups

* To provide an anchor for a link, use the {#} markup on a heading. Example: 

\#\# Chapter 3.1: Some stuff \{\#somestuff\}

To refer to such a link from another position:

Here we link to \[Some stuff\](\#somestuff).

If the sourcecode consists of several files, such links can span over different files.

* Insert footnotes like this:

Here is a footnote\^\[And this is the Text for the footnote.\], and the main text continues here.

* Sourcecode or command display

The following block will be colored as JavaScript:

    ```javascript
    function(some){
        return false;
    }
    ```


Instead of Javascript you can set other syntax names as understood by [pygments](http://pygments.org/), e.g. bash, java, html, css and so on.

If you want to markup inline, use a single backtick: \`sudo docker start -ia\`{bash}

* Remarks

Use the CSS class 'einschub' for accentuated blocks of code:

    ```{.einschub}
    This will be displayed in a box.
    ```

You can find a complete list of possible markup classes in the file `style.css` 
