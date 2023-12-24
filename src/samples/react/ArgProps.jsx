const ArgProps = ({ color: c='red', num, fn, bool, obj, id=299792458, children}) => {
    return (
        <>
            <p>{c}</p>
            <p>{num}</p>
            <p>{fn('props')}</p>
            <p>{bool ? 'true' : 'false'}</p>
            <p>{obj.name + obj.age}</p>
            <p>{id}</p>
            {children}
        </>
    )
}

export default ArgProps;