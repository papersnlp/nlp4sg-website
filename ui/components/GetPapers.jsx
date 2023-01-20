import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import papers from 'public/papers_features.json';
import Highlighter from "react-highlight-words";
import Pagination from '@mui/material/Pagination';


const GetPapers = (props) => {
    const { info } = props;
    const [data, setData] = useState([]);
    const [datapage, setDatapage] = useState([]);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setDatapage(data.slice((value - 1) * 100, (value) * 100));
        setPage(value);
    };
    useEffect(() => {
        console.log(info,papers)
        var data_filtered = papers
        if (info["goal"] != "") {
            data_filtered = data_filtered.filter((a) => a.Goal == info["goal"]);
        }
        if (info["task"] != "") {
            data_filtered = data_filtered.filter((a) => a.center_task.includes(info["task"].toLowerCase()));
        }
        if (info["method"] != "") {
            data_filtered = data_filtered.filter((a) => a.center_method.includes(info["method"].toLowerCase()));
        }
        console.log(data_filtered)
        setData(data_filtered);
        setDatapage(data_filtered.slice(0, 100));
        setPage(1);

    }, [info]);
    return (
        <div css={{ align: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                {info["goal"] != "" && <text><b>Goal: </b>{info["goal"]}</text>}&emsp;
                {info["task"] != "" && <text><b>Task: </b>{info["task"]} </text>}&emsp;
                {info["method"] != "" && <text><b>Method: </b>{info["method"]}</text>}
            </div>
            <ol className="item" start={((page - 1) * 100) + 1}>
                {
                    datapage.map(post => (
                        <li key={page + post.ID} align="start">
                            <div>
                                <Highlighter
                                    className="title"
                                    highlightClassName="HighlightAbstract"
                                    
                                    searchWords={post.tasks.concat(post.methods)}
                                    autoEscape={true}
                                    textToHighlight={post.title_clean}
                                />

                                <p className="body"><b>Goal:</b>
                                    <text> {post.Goal} </text></p>

                                <p className="body"><b>Tasks:</b>
                                    <text> {post.tasks.join(", ")}</text>
                                </p>

                                <p className="body"><b>Methods:</b>
                                    <text> {post.methods.join(", ")}</text>
                                </p>

                                <Highlighter
                                    className="body"
                                    highlightClassName="HighlightAbstract"
                                    searchWords={post.tasks.concat(post.methods)}
                                    autoEscape={true}
                                    textToHighlight={post.abstract_clean}
                                />
                                <br />
                                <br />
                            </div>
                        </li>
                    ))
                }
            </ol>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination className="d-flex justify-content-center" count={Math.ceil(data.length / 100)} page={page} onChange={handleChange} />
            </div>
        </div>
    );
};

export default GetPapers;