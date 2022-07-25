import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IconContext } from 'react-icons';
import { margin } from '@mui/system';
import { useRouter } from 'next/router';
import { Box, Text, Span, Separator, List } from '@styles/components';

const navbar = (props) => {
  const { title } = props;
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();
  const showSidebar = () => setSidebar(!sidebar);
  const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'UN Goals',
      path: '/social_needs',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text'
    },
    {
      title: 'NLP4SG Papers',
      path: '/sankey',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text'
    }
  ];
  return (
    <>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' style={{ position: 'fixed' }}>
          <FaIcons.FaBars style={{ color: '#fff', marginLeft: '10px',zIndex: '200' }} onClick={showSidebar} />
          <Text
          type="subtitle"
          css={{
            position: 'absolute',
            textAlign: 'center',
            width: '100vw',color:'white',
          }}
        ><b>{title}</b></Text>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>

              <AiIcons.AiOutlineClose style={{ color: '#fff' }} />

            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={() => router.push(item.path)}>

                  {item.icon}
                  <span style={{ marginLeft: '16px' }}>{item.title}</span>

                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

    </>
  );
}

export default navbar;