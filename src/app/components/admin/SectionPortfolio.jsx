import React, { useState, useEffect } from 'react'

const FileData = ({file}) => {
    const [fileState, setFileState] = useState(file);
    
    useEffect(() => setFileState(file), [file]);

    if (fileState.url) {
        return (
            <div>
                <h4>File Details:</h4>
                <p>File Name: {fileState.name}</p>
                <p>File Type: {fileState.type}</p>
                <img src={fileState.url} width="auto" height="200" />
            </div>
        );
    } else if (fileState.file) {
        return (
            <div>
                <h4>File Details:</h4>
                <p>File Name: {fileState.file.name}</p>
                <p>File Type: {fileState.file.type}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h4>Choose before Pressing the Upload button</h4>
            </div>
        );
    }
};

const ImageElement = ({image, removeImage, updatedImage}) => {
    const onFileChange = (event) => updatedImage(image.id, event.target.files[0]);

    return (
        <div className="form-group" style={{ border:1 + 'px solid' }}>
            <h4>Update or add new:</h4>
            <button onClick={() => removeImage(image.id)}>Remove this image</button>
            <input onChange={(event) => onFileChange(event)} type="file" accept="image/png, image/jpeg" multiple/>
            <FileData file={image}/>
        </div>
    )
}

const CardBodyElement = ({
    portfolio,
    addImage, 
    removeImage, 
    updatedImage,
    removePortfolio, 
    updatePortfolio
}) => {
    const [portfolioState, setPortfolioState] = useState(portfolio);
    
    useEffect(() => setPortfolioState(portfolio), [portfolio]);

    return (
        <div>
            <button onClick={() => removePortfolio(portfolio._id)}> Remove portfolio</button>
            <div className="form-group">
                <label htmlFor="mb-title">Title</label>
                <input type="text" className="form-control" id="mb-title" value={portfolioState.title} onChange={(event) => updatePortfolio(portfolio._id, 'title', event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="mb-description">Description</label>
                <textarea className="form-control" id="mb-description" rows="3" value={portfolioState.description} onChange={(event) => updatePortfolio(portfolio._id, 'description', event.target.value)}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="mb-date">Link</label>
                <input type="text" className="form-control" id="mb-date" placeholder="" value={portfolioState.link} onChange={(event) => updatePortfolio(portfolio._id, 'link', event.target.value)}/>
            </div>
            <button onClick={() => addImage(portfolio._id)}>Add image</button>
            <div>
            {
                portfolio.images.map(image => (
                    image && <ImageElement 
                        key={image.id} 
                        image={image} 
                        removeImage={imageId => removeImage(portfolio._id, imageId)} 
                        updatedImage={(imageId, file) => updatedImage(portfolio._id, imageId, file)} 
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
    updateValue,
    onChangePortfolio
}) {
    const PORTFOLIO_TYPE_ENUM = {
        WEB: 0,
        MOBILE: 1
    }

    const getUID = () => new Date().getTime().toString()

    const [portfolioAll, setPortfolioAll] = useState(portfolios)

    const [portfolioWeb, setPortfolioWeb] = useState([])
    
    const [portfolioMobile, setPortfolioMobile] = useState([])
    
    const [deletingImages, setDeletingImages] = useState([])

    useEffect(() => { setDeletingImages([]); setPortfolioAll(JSON.parse(JSON.stringify(portfolios))) }, [portfolios])

    useEffect(() => {
        let uploadImages = []
        
        let portfolioWebMedium = []
        
        let portfolioMobileMedium = []

        const portfoliosDeleting = 
            portfolios
            .filter(element => !portfolioAll.some(item => item._id === element._id))
            .map(element => element._id)

        portfolioAll.forEach(element => {
            const list = 
                element
                .images
                .filter(image => image && !image.url)
                .map(image => ({ id: image.id, file: image.file }))

            uploadImages = uploadImages.concat(list)

            if (element.type === PORTFOLIO_TYPE_ENUM.WEB) {
                portfolioWebMedium.push(element)
            } else {
                portfolioMobileMedium.push(element)
            }
        });
        
        setPortfolioWeb(portfolioWebMedium.map(item => item))

        setPortfolioMobile(portfolioMobileMedium.map(item => item))

        onChangePortfolio({
            deleting: deletingImages,
            uploading: uploadImages,
            portfoliosUpdating: portfolioAll,
            portfoliosDeleting: portfoliosDeleting
        })
    }, [portfolioAll])

    const addImage = (portfolioId) => {
        let medium = portfolioAll

        medium = medium.map(item => {
            if (item._id === portfolioId) {
                item.images.push({
                    id: getUID(),
                    file: null
                })
            }

            return item
        })

        setPortfolioAll(medium)
    }

    const removeImage = (portfolioId, imageId) => {
        const deleted = [...deletingImages]

        deleted.push(imageId)

        setDeletingImages(deleted)

        let medium = portfolioAll
        
        medium = medium.map(item => {
            if (item._id === portfolioId) {
                const images = item.images

                const index = item.images.findIndex(i => i.id === imageId)

                images.splice(index, 1)

                item.images = images
            }

            return item;
        })

        setPortfolioAll(medium)
    }

    const updatedImage = (portfolioId, imageId, file) => {
        let medium = portfolioAll

        medium = medium.map(item => {
            if (item._id === portfolioId) {
                item.images = item.images.map(img => {
                    if (img.id === imageId) {
                        return ({
                            ...img,
                            url: null,
                            name: null,
                            type: null,
                            file: file
                        })
                    }

                    return img
                })
            }
            return item
        })

        setPortfolioAll(medium)
    }

    const addPortfolio = (type = PORTFOLIO_TYPE_ENUM.WEB) => {
        const medium = portfolioAll

        medium.push(new Object({
            _id: getUID(),
            isNew: true,
            type: type,
            link: '',
            title: '',
            describe: '',
            images: []
        }))

        setPortfolioAll(medium.map(item => item))
    }

    const removePortfolio = (portfolioId) => {
        const medium = portfolioAll

        const index = medium.findIndex(i => i._id === portfolioId)

        const deleted = [...deletingImages].concat((medium[index].images || []).map(element => element.id))

        medium.splice(index, 1)

        setPortfolioAll(medium.map(item => item))

        setDeletingImages(deleted)
    }
    
    const updatePortfolio = (portfolioId, property, value) => {
        let medium = portfolioAll

        medium = medium.map(item => {
            if (item._id === portfolioId) {
                item[property] = value
            }
            return item
        })

        setPortfolioAll(medium)
    }

    return (
        <div className="row ml-4 mr-4">
            <div className="col-sm-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="PORTFOLIO" value={setting.portfolioTitle} onChange={(event) => updateValue('setting', 'portfolioTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-title">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title" placeholder="SAMPLES OF SOME OF MY WORK FROM THE PAST YEAR." value={setting.portfolioSubTitle} onChange={(event) => updateValue('setting', 'portfolioSubTitle', event.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Website</h3>
                        <button onClick={() => addPortfolio(PORTFOLIO_TYPE_ENUM.WEB)}>Add Website Portfolio Item</button>
                        {
                            portfolioWeb.map(portfolio => 
                                (
                                    <CardBodyElement 
                                        key={portfolio._id} 
                                        portfolio={portfolio}
                                        addImage={portfolioId => addImage(portfolioId)} 
                                        removeImage={(portfolioId, imageId) => removeImage(portfolioId, imageId)} 
                                        updatedImage={(portfolioId, imageId, file) => updatedImage(portfolioId, imageId, file)}
                                        removePortfolio={portfolioId => removePortfolio(portfolioId)} 
                                        updatePortfolio={(portfolioId, key, value) => updatePortfolio(portfolioId, key, value)}
                                    ></CardBodyElement>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Mobile</h3>
                        <button onClick={() => addPortfolio(PORTFOLIO_TYPE_ENUM.MOBILE)}>Add Mobile Portfolio Item</button>
                        {
                            portfolioMobile.map(portfolio => 
                                (
                                    <CardBodyElement 
                                        key={portfolio._id} 
                                        portfolio={portfolio}
                                        addImage={portfolioId => addImage(portfolioId)} 
                                        removeImage={(portfolioId, imageId) => removeImage(portfolioId, imageId)} 
                                        updatedImage={(portfolioId, imageId, file) => updatedImage(portfolioId, imageId, file)}
                                        removePortfolio={portfolioId => removePortfolio(portfolioId)} 
                                        updatePortfolio={(portfolioId, key, value) => updatePortfolio(portfolioId, key, value)}
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