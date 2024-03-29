import React from "react";

function Blog({ setting, updateValue }) {
    return (
        <div className="row ml-4 mr-4">
            <div className="card col-sm-12">
                <div className="card-body">
                    <form>
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="BLOG"
                                value={setting.blogTitle} 
                                onChange={(event) => updateValue('setting', 'blogTitle', event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-title">Sub Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sub-title"
                                placeholder="I SHARE MY NEWS AND BLOG"
                                value={setting.blogSubTitle} 
                                onChange={(event) => updateValue('setting', 'blogSubTitle', event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="github">Github Link</label>
                            <input
                                type="text"
                                className="form-control"
                                id="github"
                                placeholder="Link"
                                value={setting.blogGithubLink} 
                                onChange={(event) => updateValue('setting', 'blogGithubLink', event.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export const SectionBlog = Blog;
