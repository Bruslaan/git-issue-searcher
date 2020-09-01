import React, { useState } from 'react'

interface Props {
    onSelectChange: (selected: any) => void
    items: Array<any>
    selectName: String
}

const SelectComponent: React.FC<Props> = ({ onSelectChange, items, selectName }) => {

    const [selected, setSelected] = useState(items[0])

    const handleSelectedChange = (event: any) => {
        setSelected(event.target.value)
        onSelectChange(event.target.value)
    }

    return (
        <div>
            <span>{selectName}: </span>
            <select value={selected} onChange={handleSelectedChange}>

                {items.map((item, index) => {
                    return (

                        <option key={index} value={item}>{item}</option>

                    )
                })}

            </select>
        </div>

    )
}

export default SelectComponent