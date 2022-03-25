import React, { FC } from 'react';
import NavBar from './Navbar';


interface INavigation {
    name: string;
    route: string;
}

export interface INavBar {

    title: string;
    navigation: INavigation[]


}


const navigation: INavigation[] = [
    {
        name: "Servidores",
        route: "/servidores"
    },
    {
        name: "Materiais",
        route: "/materiais"
    },
    {
        name: "Cargos",
        route: "/cargos"
    },
    {
        name: "Candidatos",
        route: "/candidatos"
    },
]

export const NavbarContainer: FC = () => <NavBar 
    title='Gerenciamento de Servidores' 
    navigation={navigation} 
    />
