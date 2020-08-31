import React, { useState } from 'react'

interface Props {
    onSelectChange: (selected: any) => void
    items: Array<any>
}

const SelectComponent: React.FC<Props> = ({ onSelectChange, items }) => {

    const [selected, setSelected] = useState(items[0])

    const handleSelectedChange = (event: any) => {
        setSelected(event.target.value)
        onSelectChange(event.target.value)
    }

    return (
        <select value={selected} onChange={handleSelectedChange}>
            {items.map((item, index) => {
                return (
                    <option key={index} value={item}>{item}</option>
                )
            })}

        </select>
    )
}

export default SelectComponent