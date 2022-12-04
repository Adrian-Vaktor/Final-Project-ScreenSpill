import styled from 'styled-components'

import { Editor, EditorState } from 'draft-js'
import { useEffect, useRef, useState } from 'react'


const Characters = ({projectWork, setProjectWork}) => {

    const [ currentLine, setCurrentLine ] = useState(projectWork.script)
    const [ preppedLine, setPreppedLine ] = useState([])

    const [ newLineFlag, setNewLineFlag ] = useState(false)
    const [ exitDialogue, setExitDialogue ] = useState(false)

    const [ isTabMode, setIsTabMode ] = useState(false)
    const [ modePointerState, setModePointerState ] = useState(0)

    const [ insertSelectState, setInsertSelectState ] = useState(null)
    const [ insertCount, setinsertCount ] = useState(0)
    const [ deleteCount, setDeleteCount ] = useState(0)

    const [ characters, setCharacters ] = useState(projectWork.characters)

    const prepareDocForDom = (inputLine) => {

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

      let nameDict = {}
      if(currentLine){
        let res = prepareDocForDom(currentLine)
        const filterNames = res.filter((line) => {
          return line.formatClass === "character-line"
        })

        filterNames.forEach((name) => {
          if(!nameDict[name.text]){
            nameDict[name.text] = {
              info: '',
              description: '',
              appearence: '',
              casting: '',
            }
          }
        })

        console.log(nameDict)
        setCharacters(nameDict)
      }
    },[currentLine])


    return (
      <Characters_Wrapper>
        {
          Object.entries(characters).map((character, index) => {
            
            return <CharacterCard>{`${character[0]}`}</CharacterCard>
          })
        }
      </Characters_Wrapper>
    )
      
            
}
        
const CharacterCard = styled.div`
  background-color: white;
  margin-bottom: 20px;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  *{
    flex: 1 1 0px;
  }

  `

const Characters_Wrapper = styled.div`

  margin: 20px 10vw;
  flex-grow:1;

  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 93vh;
  // overflow-x: scroll;

  // overflow-y: scroll


  // width: 100%;
  // height: 100%;
`

export default Characters;