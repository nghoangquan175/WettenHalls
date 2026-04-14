import React from 'react';

import DropdownIcon from './icons/DropdownIcon';
import Icon from './icons/Icon';

interface DropdownItem {
  icon?: any;
  label: string;
  url?: string;
}

interface HeaderDropdownProps {
  items: DropdownItem[];
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ items }) => {
  return (
    <div className='flex flex-col w-[300px] p-4 gap-3 absolute top-[50px] left-0 rounded-[8px] bg-[rgba(6,7,7,0.5)] backdrop-blur-[15px] z-[110]'>
      <div className='flex flex-col gap-3'>
        {items.map((item, index) => (
          <div key={index} className='flex items-center gap-3 p-1 rounded-md transition-all text-sm text-white group cursor-pointer justify-between'>
            <div className='flex items-center gap-3'>
              {item.icon && <DropdownIcon src={item.icon} />}
              <span className='ContentMRegular text-baseIron00'>{item.label}</span>
            </div>
            <Icon src='callMadeWhite' className='w-[18px] h-[18px] text-white' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderDropdown;
