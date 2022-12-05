import styled from 'styled-components'

import { Editor, EditorState } from 'draft-js'
import { useEffect, useRef, useState } from 'react'


const ScriptWriter = ({projectWork, setProjectWork}) => {

    // const [ textArea, setTextArea ] = useState(null)

    const [ currentLine, setCurrentLine ] = useState(projectWork.script)
    const [ preppedLine, setPreppedLine ] = useState([])

    const [ newLineFlag, setNewLineFlag ] = useState(false)
    const [ exitDialogue, setExitDialogue ] = useState(false)

    const [ isTabMode, setIsTabMode ] = useState(false)
    const [ modePointerState, setModePointerState ] = useState(0)

    const [ insertSelectState, setInsertSelectState ] = useState(null)
    const [ insertCount, setinsertCount ] = useState(0)
    const [ deleteCount, setDeleteCount ] = useState(0)

    useEffect(()=> {
        
        setProjectWork(state => {
            return {...state, script: currentLine}
        })
        
    },[currentLine])

    const textModes = [
        '~/~scene-line~/~',
        '~/~action-line~/~',
        '~/~character-line~/~',
        '~/~dialogue-line~/~',
    ]

    const lineObjTemplate = {
        formatClass: '',
        text: ''
    }

    const ref = useRef(null)


    const prepareDocForDom = (inputLine) => {
        
        let docPrepArr = []
        let lineFormatState = 'scene-line'

        const textLoop = (i, format) => {
            let lineObj = {
                ...lineObjTemplate,
                formatClass: format,
            }
            
            let endOfLoop = i

            for (let j = i+1; j < inputLine.length; j++){
                
                if(!textModes.includes(inputLine[j])){
                    if(j >= inputLine.length-1){
                        endOfLoop = j
                        lineObj.text += inputLine[j]
                        docPrepArr.push(lineObj)
                        break

                    }else{
                        lineObj.text += inputLine[j]
                        endOfLoop = j
                    }
                }

                if(textModes.includes(inputLine[j+1])){
                    docPrepArr.push(lineObj)
                    endOfLoop = j
                    break
                }
            }
            return endOfLoop
            
        }

        for( let i = 0; i < inputLine.length; i++){
            
            switch(inputLine[i]){

                case textModes[0]:
                    lineFormatState = 'scene-line'

                    let end = textLoop(i, lineFormatState)
                    i = end
                    
                    if(textModes.includes(inputLine[i])){

                    }
                    break
                    
                case textModes[1]:
                    lineFormatState = 'action-line'
                    let end2 = textLoop(i, lineFormatState)
                    i = end2
                    break

                case textModes[2]:
                    lineFormatState = 'character-line'
                    let end3 = textLoop(i, lineFormatState)
                    i = end3
                    break

                case textModes[3]:
                    lineFormatState = 'dialogue-line'
                    let end5 = textLoop(i, lineFormatState)
                    i = end5
                    break
                    
            }
        }

        return docPrepArr
    
    }

    useEffect(() => {        
        const prepped = prepareDocForDom(currentLine)
        setPreppedLine(prepped)        
    },[])


    const setModeAndLine = (modePointer) => {
        setModePointerState(modePointer)
        // setNewLineFlag(false)
        const tempLine = [...currentLine]
        tempLine.pop()
        tempLine.push(textModes[modePointer])
        setCurrentLine(tempLine)

        const prepped = prepareDocForDom(tempLine)
        setPreppedLine(prepped)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'a'){
        }

        if(window.getSelection().toString().length !== 0){
            let select = window.getSelection()
            let range = select.getRangeAt(0)
            if(range.commonAncestorContainer.getElementsByTagName){
                let allWithinRangeParent = range.commonAncestorContainer.getElementsByTagName("*")
            }
        }
        
        if(e.key === 'Enter'){
            if(newLineFlag){
                if(exitDialogue){
                    
                    let tempModePointer = 1
                    setModeAndLine(tempModePointer)


                }else{
                    let tempModePointer = modePointerState

                    if(tempModePointer === 3){
                        setExitDialogue(true)
                        tempModePointer = 2
                        setModeAndLine(tempModePointer)

                    }else{

                        tempModePointer += 1
                        setModeAndLine(tempModePointer)
                    }
                }


            }else{
                
                if(modePointerState === 0 || modePointerState === 2){
                    const tempLine = [...currentLine]
                    tempLine.push(textModes[modePointerState])

                    let tempModePointer = modePointerState
                    if(tempModePointer + 1 > textModes.length-1){
                        tempModePointer = 0
                    }else{
                        tempModePointer += 1
                    }
                    setModePointerState(tempModePointer)
                    setNewLineFlag(false)
                    setExitDialogue(false)

                    tempLine.pop()
                    tempLine.push(textModes[tempModePointer])
                    setCurrentLine(tempLine)
    
                    const prepped = prepareDocForDom(tempLine)
                    setPreppedLine(prepped)

                }
                else{
                    let tempModePointer = modePointerState

                        const tempLine = [...currentLine]
                        tempLine.push(textModes[tempModePointer])
                        // setDocumentFormat(tempFormat)
                        setCurrentLine(tempLine)
                        setNewLineFlag(true)
        
                        const prepped = prepareDocForDom(tempLine)
                        setPreppedLine(prepped)
                    }
                }

            //Create a new line or change modes
    
        }else if(e.key === 'Backspace'){
            if(insertSelectState !== null){

                //to get a list of the original string 
                const tempStrArr = currentLine.join("")
                .replaceAll('~/~scene-line~/~', '~/~')
                .replaceAll('~/~action-line~/~', '~/~')
                .replaceAll('~/~character-line~/~', '~/~')
                .replaceAll('~/~dialogue-line~/~', '~/~')
                .split('~/~').filter((i) => {
                    return i
                })

                let lineSelectIndex = parseInt(insertSelectState.target.id)
                
                let pointer = insertSelectState.index
                let sumLengths = 0

                for ( let i = 0; i < lineSelectIndex; i++){
                    sumLengths += tempStrArr[i].length
                }

                const insertIndex = 2 + lineSelectIndex + pointer + sumLengths + insertCount + deleteCount
                
            
                let tempCurrentLine = [...currentLine]
                const start = tempCurrentLine.slice(0, insertIndex)
                const end = tempCurrentLine.slice(insertIndex);
                start.pop()

                tempCurrentLine = [...start, ...end]
                
                setCurrentLine(tempCurrentLine)

                const prepped = prepareDocForDom(tempCurrentLine)
                setPreppedLine(prepped)
                // setinsertCount(state => state+1)
                setDeleteCount(state => state-1)

            }else{
                if(currentLine.length === 0){
    
                }else{
                    let tempLine = [...currentLine]
                    tempLine.pop()
                    setCurrentLine(tempLine)
                    
                    const prepped = prepareDocForDom(tempLine)
                    setPreppedLine(prepped)
    
    
                    //delete text on current line or go back to last line
                }
            }

        }else{
            if(e.code === 'Tab' ){
                setIsTabMode(true)
            }

            if(isTabMode){
                if(
                    e.key === '1' ||
                    e.key === '2' ||
                    e.key === '3' ||
                    e.key === '4' 

                    ){

                        let tempMode = parseInt(e.key)-1

                        setModePointerState(tempMode)

                        const tempLine = [...currentLine]
                        tempLine.push(textModes[tempMode])
                        setCurrentLine(tempLine)

                        const prepped = prepareDocForDom(tempLine)
                        setPreppedLine(prepped)
                        setIsTabMode(false)
                        
                }else{
                    setIsTabMode(false) 
                }
            }else{

                //handling other types of input //
                if(
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
        
                }else if(
                    e.code === 'Escape'
                ){
                    setInsertSelectState(null)
                    setinsertCount(0)
                    setDeleteCount(0)
                }else{

                    if(insertSelectState !== null){

                        //to get a list of the original string 
                        const tempStrArr = currentLine.join("")
                        .replaceAll('~/~scene-line~/~', '~/~')
                        .replaceAll('~/~action-line~/~', '~/~')
                        .replaceAll('~/~character-line~/~', '~/~')
                        .replaceAll('~/~dialogue-line~/~', '~/~')
                        .split('~/~').filter((i) => {
                            return i
                        })

                        let lineSelectIndex = parseInt(insertSelectState.target.id)
                        
                        let pointer = insertSelectState.index
                        let sumLengths = 0

                        for ( let i = 0; i < lineSelectIndex; i++){
                            sumLengths += tempStrArr[i].length
                        }

                        const insertIndex = 2 + lineSelectIndex + pointer + sumLengths + insertCount + deleteCount
                    
                        let tempCurrentLine = [...currentLine]
                        const start = tempCurrentLine.slice(0, insertIndex)
                        const end = tempCurrentLine.slice(insertIndex);

                        tempCurrentLine = [...start, e.key, ...end]

                        setCurrentLine(tempCurrentLine)

                        const prepped = prepareDocForDom(tempCurrentLine)
                        setPreppedLine(prepped)
                        setinsertCount(state => state+1)
                    }else{
                        if(newLineFlag){
                            setNewLineFlag(false)
                            setExitDialogue(false)
    
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
                            tempLine.push(textModes[modePointerState])
    
                            tempLine.push(e.key)
                            
                            const prepped = prepareDocForDom(tempLine)
    
                            setCurrentLine(tempLine)
                            setPreppedLine(prepped)
    
            
                        }



                    }

                }
            }

        }
    }
    
    const handleSpace = (e) => {
        e.preventDefault()
    }

    const handleSelectClick = (e) => {
        console.log(e.path[0]);
    }

    useEffect(() => {

        document.addEventListener('keydown', handleSpace)
        document.addEventListener('mousedown', handleSelectClick)

        return () => {
                    document.removeEventListener('keydown', handleSpace)
                    document.removeEventListener('mousedown', handleSelectClick)
                }
    },[])

    const handleClick = () => {
        ref.current.focus()   
    };

    const randomKey = () => {
        return Math.floor(Math.random()*10000000000000)
    }

    const handleInsertClick = (e) => {
        const fontSize = 10
        const fontw = e.target.fontSize 
        const offet = e.clientX - e.target.offsetLeft+1
        const textIndex = Math.round(offet/fontSize)

        if([...e.target.classList].includes('text-Node')){
            setInsertSelectState({
                target: e.target,
                index: textIndex
            })
            setinsertCount(0)
            setDeleteCount(0)


        }else{
            
            setInsertSelectState(null)
            setinsertCount(0)
            setDeleteCount(0)
        }
    }

    return (
            <ScriptWriter_Wrapper>
                <TextArea ref={ref} onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} >
                    {
                    preppedLine.map((el, i) => {
                        
                        return(
                            <TextNode 
                            key={randomKey()} id={i} 
                            onClick={handleInsertClick}
                            className={ `text-Node ${el.formatClass}` }>{el.text}</TextNode>
                        )
                    })}
                </TextArea>
            </ScriptWriter_Wrapper>
        
    )
}


const TextNode = styled.div`
    margin: 0;
    padding: 0;
    height: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;

    &&.scene-line{

        padding: 0 5%;
        margin-top: 1em;
        margin-bottom: 1em;
        background-color: lightgrey;
        text-transform: uppercase;
        font-weight: bolder;
        width: 90%;
        max-width: 90%;
        overflow-wrap: break-word;
    }
    &&.action-line{
        padding: 0 5%;

        // background-color: yellow;
        max-width: 100%;
        overflow-wrap: break-word;

    }
    &&.character-line{
        padding: 0 5%;

        // background-color: orange;
        text-transform: uppercase;
        margin-left: 20em;
        max-width: 10em;
        overflow-wrap: break-word;
        font-weight: bolder;
        margin-top: 1em;

    }
    &&.parenthetical-line{
        padding: 0 5%;

        // background-color: green;
        margin-left: 12em;

    }

    &&.dialogue-line{
        padding: 0 5%;

        // background-color: blue;
        margin-left: 12em;
        max-width: 25em;
        overflow-wrap: break-word;
        margin-bottom: 1em;
    }

`

const TextArea = styled.div`

    &&:focus{
        outline: none;
    }
    margin: 0;
    margin-top: 20px;
    margin-left: 20px;
    padding-top: 40px;
    flex-grow:1;
    background-color: white;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: 50em;
    max-height: 90vh;
    padding-bottom: 800px;
    // overflow-x: hidden;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;`

const ScriptWriter_Wrapper = styled.div`

    margin: 0;
    flex-grow:1;

    display: flex;
    justify-content: center;
    max-height: 90vh;
    // overflow-x: scroll;

    overflow-y: hidden;


    // width: 100%;
    // height: 100%;
`

export default ScriptWriter;