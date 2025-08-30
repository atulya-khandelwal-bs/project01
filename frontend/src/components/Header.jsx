function Header() {
    return (
        <div className="flex justify-between items-center ">
            <div>
                <img src="src/assets/react.svg" alt="logo" />
            </div>
            <div>
                BigStep Technologies
            </div>
            <div>
                <Link
                    to="/login"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Sign Out
                </Link>
            </div>
        </div>
    )
}

export default Header;