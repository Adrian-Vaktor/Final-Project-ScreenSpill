
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import {v4 as uuidv4} from 'uuid';


const initListId = uuidv4()
const initCardId = uuidv4()


class InitCard {
        constructor() {
          this.cardId = uuidv4();
          this.cardName = 'New Card';
          this.cardDescription = '';
          this.assignees = '';
          // parentListid: initListId,
          this.styleId = 0
        }

      }

class InitList { 
  constructor() {

    this.listId = uuidv4();
    this.listName = 'New List';
    this.cardDescription = '';
    this.assignees = '';
    this.cards = [ new InitCard() ]

  }
}

const intialListState = [
  new InitList()
]


function Organizer({projectWork, setProjectWork}) {
  
  
  const ifInitial = projectWork.organizerLists.length !== 0 ? projectWork.organizerLists : intialListState
  
  const [ initFlag, setInitFlag ] = useState(false)

  const [ listsState, setListsState ] = useState(ifInitial)
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
    let tempNewList = new InitList()
    tempNewList.listId = uuidv4()
    // tempNewList.cards[0].cardId = uuidv4()
    // tempNewList.cards[0].cardName = uuidv4()

    tempNewList.listName = 'New List'

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

    let id = clickedCard.id
    id = id

    .replaceAll('l-',' ')
    .replaceAll('_c-',' ')
    .split(' ')
    .filter(el => {return el})

    let tempListState = [...listsState]
    const start = tempListState[id[0]].cards.slice(0, id[1])
    const end = tempListState[id[0]].cards.slice(id[1])
    const movedCard = tempListState[id[0]].cards[id[1]]
    const removedCards = tempListState[id[0]].cards.filter((el) => {
      
      return (el.cardId !== movedCard.cardId)
    })

    tempListState[id[0]].cards = removedCards
    console.log('templist',tempListState);
    // tempListState[id[0]].cards = [...start, ...end]
    tempListState[index].cards.push(movedCard)
    setListsState(tempListState)
  }

  let listIndex = 0


  const handleAddNewCard = (index) => {
    let tempListState = [...listsState]
    const newCard = new InitCard()
    tempListState[index].cards.push(newCard)

    setListsState(tempListState)

  }


  useEffect(()=> {
        
    setProjectWork(state => {
        return {...state, organizerLists: listsState}
    })
    
},[listsState])


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
              {
                list.cards.length == 0 
                ?
                <AddCardButton onClick={() => {handleAddNewCard(index)}}>+</AddCardButton>
                :
                <>
                {list.cards.map((card, cardIndex) => {
                  
                    return (
                      <>
                      <Card 
                        key={randomKey()}
                        id={`l-${listIndex}_c-${cardIndex}`}
                        style={handleStylePosition(listIndex, cardIndex)}
                        onMouseDown={handleMouseDown_Drag}
                        onMouseUp={handleMouseUp_Drag}
                        >
                        {card.cardName}
                        
                      </Card>

                      </>
                    )
                  })
                }
                <AddCardButton onClick={() => {handleAddNewCard(index)}}>+</AddCardButton>
                </>
              }
            </List>
          )
        })}
        <AddList onClick={handleAddList}>+ new list</AddList>
      </WorkspaceWrapper>
    </CardOrganizer_Wrapper>
  );
}

const AddCardButton = styled.button`
  height: 50px; 

`

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
  margin: 0 10px;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  
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
  padding: 20px;
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
  flex-grow: 1;
  width: 100%;
  // display: flex;
  // flex-direction: row;
  // align-content: start;
  // flex-wrap: wrap;
  overflow-x: scroll;
  
  // max-height: 200px;

`

export default Organizer;
