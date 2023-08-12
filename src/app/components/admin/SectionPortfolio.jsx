import React, { useState, useEffect } from 'react'
import service from '../../helper/service'

const fileData = (file) => {
    if (file) {
        return (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {file.name}</p>

                <p>File Type: {file.type}</p>

                <p>
                    Last Modified:{" "}
                    {file.lastModifiedDate.toDateString()}
                </p>

            </div>
        );
    } else {
        return (
            <div>
                <br />
                <h4>Choose before Pressing the Upload button</h4>
            </div>
        );
    }
};

const ImageElement = ({image, removeImage, updatedImage}) => {
    const onFileChange = (event) => updatedImage(image.id, event.target.files[0]);

    return (
        <div className="form-group">
            <label for="web-image">Image</label>
            <button onClick={removeImage(image.id)}> Remove image</button>
            <input type="file" onChange={onFileChange} />
            {fileData(image.file)}
        </div>
    )
}

const CardBodyElement = ({
    portfolio,
    addImage, 
    removeImage, 
    updatedImage,
    removePortfolio, 
    updatedPortfolio
}) => {
    const [portfolioState, setPortfolioState] = useState(portfolio);
    
    useEffect(() => setPortfolioState(portfolio), [portfolio]);

    // const [images, setImages] = useState([]);

    // const addImage = () => {
    //     const result = structuredClone(images)
    //     result.push({ file: '', id: images.length })
    //     setImages(result)
    // };

    // const removeImage = (id) => {
    //     const result = images.filter(item => item.id !== id)
    //     setImages(result)
    // };

    // const selectedImage = (id, file) => {
    //     const result = images.map(item => (item.id !== id ? item : { ...item, file }))
    //     setImages(result)
    // }

    // useEffect(() => setImages(props.images || []), [props.images]);

    return (
        <div>
            <button onClick={removePortfolio(portfolio.id)}> Remove portfolio</button>
            <div className="form-group">
                <label for="mb-title">Title</label>
                <input type="text" className="form-control" id="mb-title" placeholder="Project Name" value={portfolioState.title} onChange={(event) => updatedPortfolio(portfolio.id, 'title', event.target.value)}/>
            </div>
            <div className="form-group">
                <label for="mb-description">Description</label>
                <textarea className="form-control" id="mb-description" rows="3" value={portfolioState.description} onChange={(event) => updatedPortfolio(portfolio.id, 'description', event.target.value)}></textarea>
            </div>
            <div className="form-group">
                <label for="mb-date">Link</label>
                <input type="text" className="form-control" id="mb-date" placeholder="" value={portfolioState.link} onChange={(event) => updatedPortfolio(portfolio.id, 'link', event.target.value)}/>
            </div>
            <button onClick={addImage}>Add image</button>
            <div>
            {
                images.map(image => (
                    <ImageElement 
                        key={image.id} 
                        image={image} 
                        removeImage={removeImage} 
                        updatedImage={updatedImage} 
                    />
                ))
            }
            </div>
        </div>
    )
}

function Portfolio({
    setting,
    portfolios,
    updateValue
}) {
    const [portfoliosState, setPortfoliosState] = useState(portfolios);
    
    useEffect(() => setPortfoliosState(portfolios), [portfolios]);

    const test = [
        {
            id: '',
            title: '',
            type: 1,
            description: '',
            images: [
                {
                    id: '',
                    name: '',
                    url: ''
                }
            ]
        }
    ]

    // useEffect(() => {
    //     service.get(`http://localhost:2040/file/get`)
    //     service.get(`http://localhost:2040/file-incognito/1691161671302-bezkoder-appadcive.jpg`)
    // }, []);


    const onFileUpload = (selectedFile) => {
        const formData = new FormData();

        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        service.postMultipart(`http://localhost:2040/file/upload`, formData)
    };

    const addImage = () => {}
    const removeImage = () => {}
    const updatedImage = () => {}
    const addPortfolio = () => {}
    const removePortfolio = () => {}
    const updatedPortfolio = () => {}

    return (
        <div className="row ml-4 mr-4">
            <div className="col-sm-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label for="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="PORTFOLIO" value={setting.portfolioTitle} onChange={(event) => updateValue('setting', 'portfolioTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="sub-title">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title" placeholder="SAMPLES OF SOME OF MY WORK FROM THE PAST YEAR." value={setting.portfolioSubTitle} onChange={(event) => updateValue('setting', 'portfolioSubTitle', event.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Website</h3>
                        {/* <div className="form-group">
                            <label for="web-title">Title</label>
                            <input type="text" className="form-control" id="web-title" placeholder="Project Name" value={portfolio.title} onChange={(event) => updateValue('portfolio', 'title', event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label for="web-description">Description</label>
                            <textarea className="form-control" id="web-description" rows="3" value={portfolio.description} onChange={(event) => updateValue('portfolio', 'description', event.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <label for="web-date">Link</label>
                            <input type="text" className="form-control" id="web-date" placeholder="" value={portfolio.link} onChange={(event) => updateValue('portfolio', 'link', event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label for="web-image">Image</label>
                            <input type="text" className="form-control-file" id="web-image" value={portfolio.image} onChange={(event) => updateValue('portfolio', 'image', event.target.value)}/>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Mobile</h3>
                        <button onClick={addPortfolio}>Add Portfolio Item</button>
                        {
                            portfoliosState.map(portfolio => 
                                (
                                    <CardBodyElement 
                                        key={portfolio.id} 
                                        portfolio={portfolio}
                                        addImage={addImage} 
                                        removeImage={removeImage} 
                                        updatedImage={updatedImage}
                                        removePortfolio={removePortfolio} 
                                        updatedPortfolio={updatedPortfolio}
                                    ></CardBodyElement>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionPortfolio = Portfolio;