
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import {v4 as uuidv4} from 'uuid';


const initListId = uuidv4()
const initCardId = uuidv4()


const initCard = {
        cardId: initCardId,
        cardName: 'My Card',
        cardDescription: '',
        assignees: '',
        parentListid: initListId,
        styleId: 0
      }

const initList =   { 
  listId: initListId,
  listName: 'My List',
  cardDescription: '',
  assignees: '',
  cards: [{...initCard}],
}

const intialListState = [
  {...initList}
]

const initStyleState = {}

function Organizer() {

  const [ initFlag, setInitFlag ] = useState(false)

  const [ listsState, setListsState ] = useState(intialListState)
  const [ isMouseDown, setIsMouseDown ] = useState(false)
  const [ clickedCard, setClickedCard ] = useState(undefined)
  const [ isDrag, setIsDrag ] = useState(false)
  const [ startDragPos, setStartDragPos ] = useState([0,0])
  const [ currentDragPos, setCurrentDragPos ] = useState([0,0])
  
  const styleTest = {
    position: 'absolute',
    left: `${currentDragPos[0]+10}px`,
    top: `${currentDragPos[1]+10}px`
  }

  const [ stylesStates, setStylesState ] = useState(styleTest)
  const testDrag = useRef()

  const randomKey = () => {
    return Math.floor(Math.random() * 10000000)
  }
  

  const handleAddList = () => {
    let tempNewList = { ...intialListState[0] }
    tempNewList.listId = uuidv4()
    tempNewList.listName = 'Untitled List'
    setListsState([...listsState, tempNewList])
  }

  const handleMouseDown_Drag = (e) => {
  
    const offsetTop = e.target.offsetTop
    const offsetLeft = e.target.offsetLeft

    setIsMouseDown(true)
    setStartDragPos([e.clientX, e.clientY])
    setCurrentDragPos([e.clientX,e.clientY])
    let tempStyle = {...styleTest}
    tempStyle.left = e.clientX
    tempStyle.top = e.clientY
    setStylesState(tempStyle)

    setClickedCard(e.target)

  }

  const handleMouseEnter_Drag = (e) => {
    e.preventDefault()
    
    if(isMouseDown){

      setIsDrag(true)
      setStylesState(styleTest)
      setCurrentDragPos([e.clientX, e.clientY])

      let tempClicked = clickedCard
      tempClicked.style = {styleTest}
      setClickedCard(tempClicked)

    }
  }

  const handleMouseUp_Drag = (e) => {
    setIsMouseDown(false)
    setClickedCard(undefined)
    setStartDragPos([0,0])
    setCurrentDragPos([0,0])
  }

  const handleKeyPress = (e) => {
    if(e.key === 'a'){
    }
  }

  useEffect(() => {
      
      window.addEventListener('mousemove', handleMouseEnter_Drag)
      window.addEventListener('keypress', handleKeyPress)
      window.addEventListener('mouseup', handleMouseUp_Drag)

      return () => {
        window.removeEventListener('mousemove', handleMouseEnter_Drag)
        window.removeEventListener('keypress', handleKeyPress)
        window.removeEventListener('mouseup', handleMouseUp_Drag)

      }
    }
  )

  const handleStylePosition = (listI, cardI) => {

    if(clickedCard){
      if(`l-${listI}_c-${cardI}` === clickedCard.id){
        return(stylesStates)
  
      }else{
        return {
          position: 'relative',
        }
      }

    }else{
      return {
        position: 'relative',

      }
    }
  }

  const handleMouseUp = (index) => {

    console.log(listsState)
    let id = clickedCard.id
    console.log(index);

    id = id
    .replaceAll('l-',' ')
    .replaceAll('_c-',' ')
    .split(' ')
    .filter(el => {return el})

    let tempListState = [...listsState]
    const start = tempListState[id[0]].cards.slice(0, id[1])
    const end = tempListState[id[0]].cards.slice(id[1])

    tempListState[id[0]].cards = [...start, ...end]
    console.log(tempListState[id[0]].cards[id[1]]);
    

    tempListState[index].cards.push(tempListState[id[0]].cards[id[1]])

    
  }

  // window.addEventListener('mouseup', handleMouseUp_Drag)
  let listIndex = 0
  return (

    <CardOrganizer_Wrapper>
      <WorkspaceWrapper>
        {/* <Test ref={testDrag} className='' id='test'></Test> */}
        {listsState.map((list, index) => {
          listIndex = index
          
          return (
            <List
            onMouseUp={() => {handleMouseUp(index)}}
            // onMouseOver={() => {handleMouseUp(index)}}
            key={randomKey()}
            >
              <div>
                {list.listName}
              </div>
              {list.cards.map((card, cardIndex) => {
                
                return (
                  <Card 
                    key={randomKey()}
                    id={`l-${listIndex}_c-${cardIndex}`}
                    style={handleStylePosition(listIndex, cardIndex)}
                    onMouseDown={handleMouseDown_Drag}
                    onMouseUp={handleMouseUp_Drag}
                    >
                    {card.cardName}
                    
                  </Card>
                )
              })
              }
            </List>
          )
        })}
        <AddList onClick={handleAddList}>+ new list</AddList>
      </WorkspaceWrapper>
    </CardOrganizer_Wrapper>
  );
}

const Card = styled.div`
  background-color: green;
  height: 50px;
  width: 200px;

`

const AddList = styled.button`
  height 30px;
  min-width: 150px;
`

const List = styled.div`
  display: inline;
  // width: 200px;
  min-height: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  // justify-content: flex-start
  min-width: 200px;
  margin-right: 10px;
  border-radius: 5px
`

const Test = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
    &&.green{
    background-color: green;
    }
`

const WorkspaceWrapper = styled.div`
  padding: 10px;
  height: 200px;
  min-width: 100%;
  display: flex;
  flex-direction: row;
  // align-content: start;
  // flex-wrap: wrap;
  // overflow-x: scroll;
`

const CardOrganizer_Wrapper = styled.div`
  // padding: 10px;
  height: 100vh;
  width: 100%;
  // display: flex;
  // flex-direction: row;
  // align-content: start;
  // flex-wrap: wrap;
  overflow-x: scroll;
  
  // max-height: 200px;

`

export default Organizer;
