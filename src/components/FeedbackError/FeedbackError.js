function FeedbackError({children}) {
    return ( 
        <div style={{fontSize: '1.6rem'}} className="invalid-feedback">
            {children}
        </div>
    );
}

export default FeedbackError;