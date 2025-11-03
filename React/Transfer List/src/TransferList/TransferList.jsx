import{ useState } from 'react'

export default function TransferList({leftSides=[], rightSides=[]}) {
    const [leftItems, setLeftItems] = useState([...leftSides]);
    const [rightItems, setRightItems] = useState([...rightSides]);
    const [selectedLeftItems, setSelectedLeftItems] = useState(new Set());
    const [selectedRightItems, setSelectedRightItems] = useState(new Set()); 


    function handleSelectLeftItem(item) {
        setSelectedLeftItems(prev => {
            let newSet = new Set(prev);
            if (newSet.has(item)) {
                newSet.delete(item);
            } else {
                newSet.add(item);
            }
            return newSet;
        });
    }

    function handleSelectRightItem(item) {
        setSelectedRightItems(prev => {
            let newSet = new Set(prev);
            if (newSet.has(item)) {
                newSet.delete(item);
            } else {
                newSet.add(item);
            }
            return newSet;
        });
    }

    const moveLeftDisabled = selectedRightItems.size === 0;
    const moveAllLeftDisabled = rightItems.length === 0;
    const moveRightDisabled = selectedLeftItems.size === 0;
    const moveAllRightDisabled = leftItems.length === 0;    


    function handleMoveLeft(){
        if(selectedRightItems.length === 0) return;
        setRightItems(prev => prev.filter(item => selectedRightItems.has(item) === false));
        setLeftItems(prev => [...prev, ...selectedRightItems]);
        setSelectedLeftItems(prev => new Set([...prev, ...selectedRightItems]));
        setSelectedRightItems(new Set());
    }

    function handleMoveAllLeft(){
        if(rightItems.length === 0) return;  
        setLeftItems(prev => [...prev, ...rightItems]);
        setRightItems([]);
        setSelectedLeftItems(prev => new Set([...prev, ...selectedRightItems]));
        setSelectedRightItems(new Set());
    }

    function handleMoveRight() {
        if(selectedLeftItems.size === 0) return;
        setLeftItems(prev => prev.filter(item => selectedLeftItems.has(item) === false));
        setRightItems(prev => [...prev, ...selectedLeftItems]);
        setSelectedRightItems(prev => new Set([...prev, ...selectedLeftItems]))
        setSelectedLeftItems(new Set());
    }

    function handleMoveAllRight(){
        if(leftItems.size === 0) return;  
        setRightItems(prev => [...prev, ...leftItems]);
        setLeftItems([]);
        setSelectedRightItems(prev => new Set([...prev, ...selectedLeftItems]))
        setSelectedLeftItems(new Set());
    }


  return (
    <div className="transfer-list-container">
      <div className="transfer-list-side left">
          {leftItems.map(item => <div key={item}>
            <input type="checkbox" id={item} onChange={() => handleSelectLeftItem(item)} checked={selectedLeftItems.has(item)}/>
            <label htmlFor={item}>{item}</label>
          </div>)}
      </div>
      <div className='transfer-list-btns'>
        <button onClick={handleMoveAllRight} disabled={moveAllRightDisabled}>{'>>'}</button>
        <button onClick={handleMoveRight} disabled={moveRightDisabled}>{">"} </button>
      <button onClick={handleMoveLeft} disabled={moveLeftDisabled} >{"<"}</button>
        <button onClick={handleMoveAllLeft} disabled={moveAllLeftDisabled}>{'<<'}</button>
      </div>
      <div className="transfer-list-side right">
          {rightItems.map(item => <div key={item}>
             <input type="checkbox" id={item} onChange={() => handleSelectRightItem(item)} checked={selectedRightItems.has(item)}/>
            <label htmlFor={item}>{item}</label>
          </div>)}
      </div>
    </div>
  )
}
