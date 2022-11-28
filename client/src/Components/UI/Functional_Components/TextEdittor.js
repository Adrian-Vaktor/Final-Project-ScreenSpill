import styled from 'styled-components'

import { Editor, EditorState } from 'draft-js'


const TextEditor = () => {

    const [ textState, setTextState ] = useState(EditorState.createEmpty())

    const handleChange = (e) => {
        setTextState(e)
    }

    return (
        <>
        TextEditor
        
        <Editor className="editor-container" editorState={textState} onChange={handleChange}/>
        </>
    )
}


export default TextEditor;