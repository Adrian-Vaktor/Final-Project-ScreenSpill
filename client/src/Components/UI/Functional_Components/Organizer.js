
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Move } from "react-feather";

import {v4 as uuidv4} from 'uuid';
import ModalBackdrop from "../../Misc/ModalBackdrop";


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
    this.listDescription = '';
    this.assignees = '';
    this.cards = [ new InitCard() ]

  }
}

const intialListState = [
  new InitList()
]

const initEditInputState = {
  cardName: 'New Card',
  cardDescription: ''
} 


function Organizer({projectWork, setProjectWork}) {
  
  
  const ifInitial = projectWork.organizerLists.length !== 0 ? projectWork.organizerLists : intialListState
  
  const [ initFlag, setInitFlag ] = useState(false)

  const [ listsState, setListsState ] = useState(ifInitial)
  const [ isMouseDown, setIsMouseDown ] = useState(false)
  const [ clickedCard, setClickedCard ] = useState(undefined)
  const [ isDrag, setIsDrag ] = useState(false)
  const [ startDragPos, setStartDragPos ] = useState([0,0])
  const [ currentDragPos, setCurrentDragPos ] = useState([0,0])
  const [ isSetInfo, setIsSetInfo ] = useState(false)
  
  const [ isEditCardModalOpen, setIsEditCardModalOpen ] = useState(false)
  const [ whichCardToEdit, setWhichCardToEdit ] = useState(undefined)
  const [ cardEditInputsState, setCardEditInputsState ] = useState(initEditInputState)


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
      console.log(e);
      
      setClickedCard(e.target.parentNode)

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

    if(clickedCard){

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
  }

  let listIndex = 0


  const handleAddNewCard = (index) => {
    console.log(index);
    

    let tempListState = [...listsState]
    
    const newCard = new InitCard()
    tempListState[index].cards.push(newCard)
    console.log(tempListState, listsState);

    setListsState(tempListState)

  }


  useEffect(()=> {
        
    setProjectWork(state => {
        return {...state, organizerLists: listsState}
    })
    
},[listsState])


const handleCardEdit = (e) => {
  e.preventDefault()
  // setIsSetInfo(true)
  console.log(cardEditInputsState)
  let tempListState = listsState.map(list => {
    let tempCards = list.cards.map(card => {
      if(card.cardId === cardEditInputsState.cardId){
        return cardEditInputsState
      }else{
        return card
      }
    })
    let tempList = {...list}
    tempList.cards = tempCards
    return tempList
  })
  
  setListsState(tempListState)
}


const handleDeleteList = (targList) => {

  const tempListState = [...listsState]
  const tempNewList = tempListState.filter((list) => {
    return list.listId !== targList.listId
  })

  setListsState(tempNewList)
}

const handleEditCard = (e, targetCard) => {
  e.preventDefault()
  setIsEditCardModalOpen(true)
  setWhichCardToEdit(targetCard)
  setCardEditInputsState(targetCard)
}

const handleEditCardChange = (e, input) => {
  switch(input){
    case 'title':
      let tempStateTitle = {...cardEditInputsState}
      tempStateTitle.cardName = e.target.value
      setCardEditInputsState(tempStateTitle)
      break

    case 'description':
      let tempStateDes = {...cardEditInputsState}
      tempStateDes.cardDescription = e.target.value
      setCardEditInputsState(tempStateDes)
      return
  }
}
useEffect(() => {
  if(!isEditCardModalOpen){
    setCardEditInputsState(initEditInputState)

  }

},[isEditCardModalOpen])


  return (
    <>
    
      {
        isEditCardModalOpen
        ?
        <CardEdit_Wrapper>
          <CardEditModal>

            <CardEditModal className='inner'>
              <EditInput type='text' value={cardEditInputsState.cardName} onChange={(e) => {handleEditCardChange(e, 'title')}}></EditInput>
              <Description type='text' value={cardEditInputsState.cardDescription} onChange={(e) => {handleEditCardChange(e, 'description')}}></Description>
              <SubmitCardEdit onClick={(e)=> {handleCardEdit(e, cardEditInputsState)}}>Submit</SubmitCardEdit>
            </CardEditModal>
          </CardEditModal>

          <ModalBackdrop isBlack={true} setIsOpen={setIsEditCardModalOpen}/>

        </CardEdit_Wrapper>
        :
        <></>
      }

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

                <ListHeader>
                  <ExitButton onMouseDown={() => {handleDeleteList(list)}}/>
                  {list.listName}
                </ListHeader>
                {
                  list.cards.length == 0 
                  ?
                  <AddCardButton onMouseUp={() => {handleAddNewCard(index)}}>+</AddCardButton>
                  :
                  <>
                  {list.cards.map((card, cardIndex) => {
                    
                      return (
                        <>
                        <Card 
                          key={randomKey()}
                          id={`l-${listIndex}_c-${cardIndex}`}
                          style={handleStylePosition(listIndex, cardIndex)}
                          onMouseUp={(e) => {handleEditCard(e, card)}}

                          >
                          <MoveDiv
                            onMouseDown={handleMouseDown_Drag}
                            onMouseUp={handleMouseUp_Drag}>
                            < MoveStyle pointerEvents='none'/>
                          </MoveDiv>
                          {card.cardName}

                          
                        </Card>

                        </>
                      )
                    })
                  }
                  <AddCardButton onMouseUp={() => {handleAddNewCard(index)}}>+</AddCardButton>
                  </>
                }
              </List>
            )
          })}
          <AddList onClick={handleAddList}>+ new list</AddList>
        </WorkspaceWrapper>
      </CardOrganizer_Wrapper>
    </>
  );
}

const SubmitCardEdit = styled.button`
  margin-top: 10px;
`

const EditInput = styled.input`

&.description{
  width: 80%;
  height: 100px;
}

`

const Description = styled.textarea`

  resize: none;
  width: 100%;
  height: 100px;
  margin-top: 10px;

`

const CardEdit_Wrapper = styled.div`

  width: 100%;
  height: 100%;
  // flex-grow: 1;
  position: absolute;
  z-index: 150;

`

const CardEditModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 45%;
  left: 50%;
  z-index: 100;
  width: 600px;
  height: 300px;
  background-color: white;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  &.inner{
    top: 50%;
    left: 50%;
    width: 80%;
    height: 90%;
    align-items: start;
    box-shadow: rgba(0,0,0,0) 0px 0px 0px;



  }

`

const MoveDiv = styled.div`
  width: 20px;
  height: 20px;
`

const MoveStyle = styled(Move)`
  width: 100%;
  height: 100%;
`

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

`

const ExitButton = styled.button`
  height: 12px;
  width: 12px;
  background-color: #e86d38;
  border: none;
  border-radius: 50%;
  position: relative;
  left: 90%;
`

const AddCardButton = styled.button`
  height: 25px; 
  width: 25px;
  color: green;
  margin-top: 20px;
  border: solid lightblue 1px;
  border-radius: 50%;
  display: flex:
  justify-content: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 4px;

  &:active{
    background-color: grey
  }
  z-index: 10;

`

const Card = styled.div`
  background-color: green;
  box-sizing: border-box;
  height: 45px;
  width: 200px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;

`

const AddList = styled.button`
  height 30px;
  min-width: 150px;
  margin-right: 2000px;
`

const List = styled.div`
  min-height: 500px;
  height: 500px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: flex-start
  min-width: 200px;
  margin: 0 10px;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  `


const WorkspaceWrapper = styled.div`
  padding: 20px;
  height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: row;
  // align-content: start;
  // flex-wrap: wrap;
  // overflow-x: scroll;

`

const CardOrganizer_Wrapper = styled.div`
  // padding: 10px;
  // flex-grow: 1;
  width: calc(100vw - 60px);
  // display: flex;
  // flex-direction: row;
  // align-content: start;
  // flex-wrap: wrap;
  overflow-x: scroll;
  
  // max-height: 200px;

`

export default Organizer;
