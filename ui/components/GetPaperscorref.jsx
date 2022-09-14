import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import papers from 'public/papers_features_corref.json';
import HighlightColors2 from "../components/HighlightColors2";
import Pagination from '@mui/material/Pagination';


const GetPaperscorref = (props) => {
    const { info } = props;
    const [data, setData] = useState([]);
    const [datapage, setDatapage] = useState([]);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setDatapage(data.slice((value - 1) * 100, (value) * 100));
        setPage(value);
    };
    useEffect(() => {
        var data_filtered = papers
        setData(data_filtered);
        setDatapage(data_filtered.slice(0, 100));
        setPage(1);

    }, [info]);
    return (
        <div css={{ align: 'center' }}>
            <ol className="item" start={((page - 1) * 100) + 1}>
                { 
                    datapage.map(post => (
                        <li key={page + post.ID} align="start">
                            <div>
                            

                                <p className="body"><b>Tasks:</b>
                                    <text> 
                                        <ol>
                                        {post.tasks.map((y) => <li>{y.flat(1).join(", ")}</li>)}
                                        </ol>
                                    </text>
                                </p>
                                <p className="body"><b>Gold Tasks:</b>
                                    <text> {post.task_annotation.join(", ")}</text>
                                </p>
                                <HighlightColors2
                                    className="body"
                                    highlightClassName="HighlightClass"
                                    searchWords={post.tasks.flat(1).concat(post.task_annotation)}
                                    searchWords2={post.task_unmatch_golden}
                                    searchWords3={post.task_match_total}
                                    searchWords4={post.task_match_group}
                                    searchWords5={post.task_unmatch_pred}
                                    autoEscape={true}
                                    textToHighlight={post.title_clean.concat(post.abstract_clean)}
                                />
                                <br />

                                <p className="body"><b>Methods:</b>
                                    <text> 
                                        <ol>
                                        {post.methods.map((y) => <li>{y.flat(1).join(", ")}</li>)}
                                        </ol>
                                    </text>
                                </p>
                                <p className="body"><b>Gold Methods:</b>
                                    <text> {post.method_annotation.join(", ")}</text>
                                </p>
                                
                                <HighlightColors2
                                    className="body"
                                    highlightClassName="HighlightClass"
                                    searchWords={post.methods.flat(1).concat(post.method_annotation)}
                                    searchWords2={post.method_unmatch_golden}
                                    searchWords3={post.method_match_total}
                                    searchWords4={post.method_match_group}
                                    searchWords5={post.method_unmatch_pred}
                                    autoEscape={true}
                                    textToHighlight={post.title_clean.concat(post.abstract_clean)}
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

export default GetPaperscorref;