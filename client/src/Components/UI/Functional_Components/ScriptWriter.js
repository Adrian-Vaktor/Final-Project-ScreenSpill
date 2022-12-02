import styled from 'styled-components'

import { Editor, EditorState } from 'draft-js'
import { useEffect, useRef, useState } from 'react'


const ScriptWriter = () => {

    // const [ textArea, setTextArea ] = useState(null)

    const [ currentLine, setCurrentLine ] = useState([])
    const [ preppedLine, setPreppedLine ] = useState([])

    const [ documentFormat, setDocumentFormat ] = useState([])
    const [ documentArray, setDocumentArray ] = useState([])
    const [ pointerState, setPointerState ] = useState(null)
    const [ newLineFlag, setNewLineFlag ] = useState(false)
    const [ isTabMode, setIsTabMode ] = useState(false)
    const [ modePointerState, setModePointerState ] = useState(0)
    
    const prepareDocForDom = (inputLine) => {

        console.log('inside function',inputLine);
        
        let docPrepArr = []
        let lineFormatState = 'scene-line'

        const textLoop = (i, format) => {
            let lineObj = {
                formatClass: format,
                text: ''
            }
            
            let endOfLoop = 0

            for (let j = i+1; j < inputLine.length; j++){

                if(!textModes.includes(inputLine[j])){
                    if(j == inputLine.length-1){
                        endOfLoop = j
                        lineObj.text += inputLine[j]
                        docPrepArr.push(lineObj)
                        break
                    }else{
                        lineObj.text += inputLine[j]
                        endOfLoop = j
                    }
                }else{
                    docPrepArr.push(lineObj)
                    endOfLoop = j
                    break
                }
            }
            return endOfLoop
            
        }

        for( let i = 0; i < inputLine.length; i++){
            
            switch(inputLine[i]){

                case '~/~scene-line~/~':
                    lineFormatState = 'scene-line'
                    console.log('scene-line function',inputLine);

                    let end = textLoop(i, lineFormatState)
                    console.log('end',end);

                    i = end                    
                    break
                    
                case '~/~action-line~/~':
                    lineFormatState = 'action-line'
                    let end2 = textLoop(i, lineFormatState)
                    i = end2
                    break
                    
                case '~/~character-line~/~':
                    lineFormatState = 'character-line'
                    let end3 = textLoop(i, lineFormatState)
                    i = end3
                    break
                    

                case '~/~parenthetical-line~/~':
                    lineFormatState = 'parenthetical-line'
                    let end4 = textLoop(i, lineFormatState)
                    i = end4
                    break

                case '~/~dialogue-line~/~':
                    lineFormatState = 'dialogue-line'
                    let end5 = textLoop(i, lineFormatState)
                    i = end5
                    break
                    
            }
        }



        return docPrepArr
    
    }



    const formatDict = {
        '~/~NewLine~/~': ''
    }

    const textModes = [
        '~/~scene-line~/~',
        '~/~action-line~/~',
        '~/~character-line~/~',
        '~/~parenthetical-line~/~',
        '~/~dialogue-line~/~',
    ]

    const ref = useRef(null)
    
    const handleKeyDown = (e) => {
        if(e.key === 'a'){
            // console.log(window.getSelection().toString())

        }

        if(window.getSelection().toString().length !== 0){

        }
        
        if(e.key === 'Enter'){
            if(newLineFlag){

                let tempModePointer = modePointerState
                tempModePointer += 1
                setModePointerState(tempModePointer)
                setNewLineFlag(false)
                const tempLine = [...currentLine]
                tempLine.push(textModes[tempModePointer])
                setCurrentLine(tempLine)

                const prepped = prepareDocForDom(tempLine)
                setPreppedLine(prepped)
                

            }else{
                
                
                const tempLine = [...currentLine]
                tempLine.push(textModes[modePointerState])
    
                // setDocumentFormat(tempFormat)
                setCurrentLine(tempLine)
                setNewLineFlag(true)

                const prepped = prepareDocForDom(tempLine)
                setPreppedLine(prepped)

            }
            //Create a new line or change modes
    
        }else if(e.key === 'Backspace'){
            console.log('backspace');

            
            if(currentLine.length === 0){

            }else{
                let tempLine = [...currentLine]
                tempLine.pop()
                setCurrentLine(tempLine)

                //delete text on current line or go back to last line
            }
    
        }else{
            if(e.code === 'Tab' ){
                // console.log('hey');
                setIsTabMode(true)
            }

            if(isTabMode){
                if(
                    e.key === '1' ||
                    e.key === '2' ||
                    e.key === '3' ||
                    e.key === '4' ||
                    e.key === '5'

                    ){
                        let tempMode = parseInt(e.key) - 1
                        setModePointerState(tempMode)
                        setIsTabMode(false)
                }
            }else{

                //handling other types of input //
                if(
                    e.code === 'Escape' ||
                    e.code === 'Tab' ||
                    e.code === 'CapsLock' ||
                    e.code === 'ShiftLeft' ||
                    e.code === 'ShiftRight' ||
                    e.code === 'AltLeft' ||
                    e.code === 'AltRight' ||
                    e.code === 'ControlLeft' ||
                    e.code === 'ControlRight' ||
                    e.code === 'MetaLeft' ||
                    e.code === 'MetaRight' ||
                    e.code === 'ArrowLeft' ||
                    e.code === 'ArrowRight' ||
                    e.code === 'ArrowUp' ||
                    e.code === 'ArrowDown'
                    ){
        
                }else{
                    if(newLineFlag){
                        setNewLineFlag(false)
                    }
                    //inputting text
                    if(currentLine.length !== 0){
                        
                        //if there is already a line created
                        
                        const tempLine = [...currentLine]
                        tempLine.push(e.key)
                        
                        setCurrentLine(tempLine)

                        const prepped = prepareDocForDom(tempLine)
                        setPreppedLine(prepped)
                        
                        
                    }else{
                    
                        //create a new line if there is no line 
        
                        const tempLine = [...currentLine]
                        tempLine.push(textModes[modePointerState])
                        tempLine.push(e.key)
                        
                        const prepped = prepareDocForDom(tempLine)

                        console.log('1tmep', tempLine, '2temp', prepped);
                        setCurrentLine(tempLine)
                        setPreppedLine(prepped)

        
                    }
                }
            }

        }
    }
    
    const handleSpace = (e) => {
        e.preventDefault()
        
    }

    useEffect(() => {

        document.addEventListener('keydown', handleSpace)
        return () => {
                    document.removeEventListener('keydown', handleSpace)
                }
    },[])

    useEffect(()=> {

    },[currentLine])

    const handleClick = () => {
        ref.current.focus();
        
    };

    const randomKey = () => {
        return Math.floor(Math.random()*10000000000000)
    }
  

//     const newSpan = (text, mode) => {

//             const textArea = ref.current
            
//             const span = document.createElement('span')
//             span.classList.add('text-line')
//             span.classList.add(textModes[mode])
        
//             span.classList.add(`line-${spanArr.length}`)
//             let newPointer = {el: span, ind: spanArr.length, text: text}
//             setPointerState(newPointer)
//             textArea.appendChild(span)

//             let tempSpanArr = [...spanArr]
//             tempSpanArr.push(span)

//             setSpanArr(tempSpanArr)
//             // spanArr.push(span)
// }

    useEffect(() => {

    },[])


    return (

            <TextArea ref={ref} onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} >
                {
                preppedLine.map(el => {

                    console.log(currentLine, preppedLine)

                    return(
                        <TextNode className={el.formatClass}>{el.text}</TextNode>
                    )
                })}
            </TextArea>
        
    )
}

const Div = styled.div`
    height: 10px;

    &&.scene-line{
        background-color: red
    }
    &&.action-line{
        background-color: yellow

    }
    &&.character-line{
        background-color: orange

    }
    &&.parenthetical-line{
        background-color: green

    }
    &&.dialogue-line{
        background-color: blue

    }


`

const TextNode = styled.div`
    margin: 0;
    padding: 0;
    // display: inline-block;

    &&.scene-line{
        background-color: red
    }
    &&.action-line{
        background-color: yellow

    }
    &&.character-line{
        background-color: orange

    }
    &&.parenthetical-line{
        background-color: green

    }
    &&.dialogue-line{
        background-color: blue

    }

`

const TextArea = styled.div`
    flex-grow:1;
    // width: 100%;
    // height: 100%;
    background-color: white;

    

`

const ScriptWriter_Wrapper = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
`

export default ScriptWriter;