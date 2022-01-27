//App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: defaultCode
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      markdown: event.target.value
    })
  };
  
  render() {
    return (
      <div className="main">
        <div>
          <TitleBar title="Editor" class="left"/>
          <TitleBar title="Previewer" class="right"/>
        </div>
        <div>
          <Editor markdown={this.state.markdown} 
          onChange={this.handleChange} />
          <Previewer markdown={this.state.markdown}/>
        </div>
      </div>
    );
  }
};

// Editor
const TitleBar = (props) => {
  return (
    <div className={"titlebar column " + props.class}>
      <h2>{props.title}</h2>
    </div>
  );
};


// Editor
const Editor = (props) => {
  return (
    <div className="editor column left">
      <textarea id="editor"
        
        value={props.markdown}
        onChange={props.onChange}
        type="text"/>  
    </div>
  );
};

// Previewer
const Previewer = (props) => {
  return (
    <div className="previewer column right">
      <div id='preview' 
        dangerouslySetInnerHTML={{
          __html: marked(props.markdown)}} />   
    </div>
  );
};

marked.setOptions({
  breaks: true,
});

const defaultCode = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

//Render to HTML
ReactDOM.render(
  <App />,
  document.getElementById('app')
);







body, html {
  background-color: black;
  
}

.column {
  width: 49.5%;
  display: inline-block;
  vertical-align: top;
  background-color: darkgray;
  border: 1px solid white;
}

.right {
  float: right;
}

.left {
  float: left;
}

.titlebar {
  margin-top: 5px; 
  background-color: darkslategrey;
  height: 100%;
}

.titlebar h2 {
  color: lightgrey;
  padding-left: 5px;
  margin: auto;
}

.previewer {
  min-height: 95vh;
  height: 95vh;
  overflow-x: auto;
}

textarea {
  margin-bottom: -4px;
  min-height: 95vh;
  height: 95vh;
  background-color: black;
  color: lightgrey;
  width: 100%;
  -webkit-box-sizing: border-box; 
  -moz-box-sizing: border-box;    
  box-sizing: border-box;
}



<div id="app"></div>

<!--
Objective: Build a CodePen.io app that is functionally similar to this: https://codepen.io/freeCodeCamp/full/GrZVVO.

Fulfill the below user stories and get all of the tests to pass. Give it your own personal style.

You can use any mix of HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux, and jQuery to complete this project. You should use a frontend framework (like React for example) because this section is about learning frontend frameworks. Additional technologies not listed above are not recommended and using them is at your own risk. We are looking at supporting other frontend frameworks like Angular and Vue, but they are not currently supported. We will accept and try to fix all issue reports that use the suggested technology stack for this project. Happy coding!

User Story #1: I can see a textarea element with a corresponding id="editor".

User Story #2: I can see an element with a corresponding id="preview".

User Story #3: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.

User Story #4: When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type (HINT: You don't need to parse Markdown yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked).

User Story #5: When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text.

User Story #6: When my markdown previewer first loads, the default markdown in the #editor field should be rendered as HTML in the #preview element.

Optional Bonus (you do not need to make this test pass): My markdown previewer interprets carriage returns and renders them as br (line break) elements.
-->
