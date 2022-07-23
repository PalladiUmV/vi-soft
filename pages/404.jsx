export default function Error() {
    return (
        <div className="error">
            <h1>
                Такой страницы не существует
            </h1>

            <style jsx>
                {`
                    .error {
                        background: purple;
                        padding: 15px;
                        text-align: center;
                        color: white;
                    }
                   
                `}
            </style>
        </div>
    );


};
