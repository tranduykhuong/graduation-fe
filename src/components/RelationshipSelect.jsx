import { useState } from 'react';

const RELATIONSHIP_MAPPING = [
  "ông",
  "bà",
  "cậu",
  "mợ",
  "dì",
  "dượng",
  "chú",
  "bác",
  "anh",
  "chị",
  "em",
  "cháu",
  "thầy",
  "cô",
	"bạn",
];

function RelationshipSelect({ selectedRelationship, setSelectedRelationship }) {

  const handleSelectChange = (event) => {
    setSelectedRelationship(event.target.value);
  };

  return (
    <div>
      <h4 className="text-base text-black font-medium font-stylescript">Bạn có quan hệ như thế nào với Khương vậy nhỉ</h4>

			<select
        id="relationship"
        value={selectedRelationship}
        onChange={handleSelectChange}
				className='w-40 p-2 bg-transparent text-black border mt-3'
      >
        {RELATIONSHIP_MAPPING.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RelationshipSelect;
