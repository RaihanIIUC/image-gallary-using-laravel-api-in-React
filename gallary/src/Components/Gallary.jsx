import React, { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
  
function ImageGallary() {
    const [selectedFile, setSelectedFile] = useState();
    const [loadimage, setLoadImage] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        const result = await axios.get("http://localhost:8000/api/gallery");
        setLoadImage(result.data.reverse());
    };


    const handleSubmission = async (e) => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", name);
        formData.append("desc", desc);
        await fetch("http://localhost:8000/api/upload", {
            method: "POST",
            body: formData,
        })
            .then((result) => {
                loadList();
            })
            .catch(() => {
                alert('Error in the Code');
            });
    };

    const deleteImage = (productId) => {
        axios.get('http://localhost:8000/api/delete/' + productId)
            .then((result) => {
                loadList();
            })
            .catch(() => {
                alert('Error in the Code');
            });
    };

    return (
        <div className="container">
            <h4 class="text-center text-success  ml-4 mb-4 mt-4">Image Gallary in ReactJS</h4>
            <div className="row">
                <div className="col-sm-3 p-2 bg-gray">
                    <div className="box mr-4" style={{ border: "1px solid #b7b7b7", backgroundColor: "#rgb(253 253 253);" }}>
                        <h5 class="text-center  ml-4 mb-3 mt-3">Add Image</h5>
                        <table className="">
                            <tr>
                                <td>
                                    <div class="form-group ml-3">
                                        <input type="text" name="name" className="mb-4" onChange={(e) => setName(e.target.value)} placeholder="Country Name" />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="form-group">
                                        <textarea type="text" name="desc" className="mb-4" rows="3" cols="23" onChange={(e) => setDesc(e.target.value)} placeholder="Write Description" />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="form-group">
                                        <input type="file" name="file" className="mb-4" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="form-group">
                                        <button type="submit" onClick={handleSubmission} class="btn btn-success mb-3" name="submit">
                                            Add Gallary
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        {loadimage.map((name) => (
                            <div className="col-sm-3">
                                <div class="card mb-3" style={{ width: "12rem" }}>
                                    <h5><a href="#" onClick={() => deleteImage(name.id)} style={{ textDecoration: "none", marginLeft: "162px" }}>
                                        <span aria-hidden="true" className="text-danger">&times;</span>
                                    </a></h5>
                                    <img class="card-img-top hover-shadow" src={"http://localhost:8000/" + name.img_path} alt="Card image cap" style={{ height: "110px" }} />

                                    <div class="card-body">
                                        <h6>{name.name}</h6>
                                        <span class="card-text">{name.description}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ImageGallary;