import React from "react";
import { useEffect } from "react";
import './styles.css';
import axios from 'axios';
import { useState } from "react";
import { RecordsResponse } from './types';
import {formatDate} from './helpers'
import Pagination  from './Pagination'

const BASE_URL = 'http://localhost:8080'
const Records = () => {
    const [recordsResponse, setRecordsReponse] = useState<RecordsResponse>();
    const [activePage, setActivePage] = useState(0);



    useEffect(() => {
        axios.get(`${BASE_URL}/records?size=12&page=${activePage}`).
            then(response => setRecordsReponse(response.data));
    }, [activePage]);


    const hendlePageChange = (index : number) => {
        setActivePage(index);
    }



    return (
        <div className="page-container">
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(record => (
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlatform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>
                    ))}


                </tbody>
            </table>
            <Pagination 
            activePage = {activePage}
            goToPage = {hendlePageChange}
            totalPages = {recordsResponse?.totalPages}

            />
        </div>
    );
}

export default Records;