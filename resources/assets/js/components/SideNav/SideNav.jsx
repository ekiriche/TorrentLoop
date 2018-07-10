import React from 'react';
import { SideNav, Chevron, Icon } from 'react-side-nav';


//specify the base color/background of the parent container if needed
const MySideNav = () => (
    <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>
            <Nav id='dashboard'>
                <NavIcon><SvgIcon size={20}/></NavIcon>
                <NavText> Dashboard </NavText>
            </Nav>
            <Nav id='sales'>
                <NavIcon><SvgIcon size={20} /></NavIcon>
                <NavText> Sales </NavText>
            </Nav>
        </SideNav>
    </div>
)
