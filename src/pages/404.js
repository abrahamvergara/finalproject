import React from 'react'
import Nav from "../Components/nav";

export default function NotFound() {
    return (
        <div>
            <Nav />
            <p className="welcome">
                404 Not Found <br />
            </p>
            <p class="tag">This Page is Not Available</p>
        </div>
    )
}
