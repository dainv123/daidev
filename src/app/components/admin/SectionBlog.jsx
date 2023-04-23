import React from "react";

function Blog() {
    return (
        <div class="row ml-4 mr-4">
            <div class="card col-sm-12">
                <div class="card-body">
                    <form>
                        <h3>Configuration</h3>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input
                                type="text"
                                class="form-control"
                                id="title"
                                placeholder="BLOG"
                            />
                        </div>
                        <div class="form-group">
                            <label for="sub-title">Sub Title</label>
                            <input
                                type="text"
                                class="form-control"
                                id="sub-title"
                                placeholder="I SHARE MY NEWS AND BLOG"
                            />
                        </div>
                        <div class="form-group">
                            <label for="github">Github Link</label>
                            <input
                                type="text"
                                class="form-control"
                                id="github"
                                placeholder="https://api.github.com/users/dainv123/repos"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export const SectionBlog = Blog;
