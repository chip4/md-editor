import html from '../externals/choo-html.js';
import flexbox from '../components/flexbox.js'
import showdown from '../externals/showdown.js';
import CodeMirrorElem from '../components/CodeMirrorElem.js';
import editorHistoryList from '../components/editorHistoryList.js'
var converter = new showdown.Converter();

const prefix = 'editor';
const changeEvent = `${prefix}:change`;
const saveEvent = `${prefix}:save`;

const defaultEditorContents = `
# h1

## h2

* bullet
* bullet

1. number
2. number

\`asdfa\`
\`\`\`
function(){
  var a = 1;
  return a++;
}
\`\`\`
`;


export function editorStore(state, emitter){
  state.rawMd = defaultEditorContents;
  state.editorHistory = [];
  emitter.on(changeEvent, function(data){
    state.rawMd = data;
    emitter.emit('render');
  });
  emitter.on(saveEvent, function(data){
    state.editorHistory.push({
      timestamp: new Date().toISOString(),
      fileContents: data
    });
    emitter.emit('render');
  });
}

const codeMirror = new CodeMirrorElem();

function preview(rawMd){
  const preview = html`<div></div>`;
  preview.innerHTML = converter.makeHtml(rawMd);
  return preview;
}

export default function (state, emit){
  return html`
    ${flexbox({flexDirection: 'column'},
      flexbox(
        flexbox({ flexBasis: '20%' },
          editorHistoryList({
            history: state.editorHistory,
            handleClick: (entry) => emit(changeEvent, entry.fileContents)
          })
        ),
        flexbox({ flexGrow: 2 },
          codeMirror.render({onChange, onSave, value: state.rawMd})
        ),
        flexbox({ flexGrow: 2 },
          preview(state.rawMd)
        )
      )
    )}
  `;

  function onChange(instance) {
    emit(changeEvent, instance.doc.getValue());
  };

  function onSave(instance){
    emit(saveEvent, instance.doc.getValue());
  }
}