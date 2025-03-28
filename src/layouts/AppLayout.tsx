export function AppLayout() {
  return (
    <>
      <header className="p-5 border-b border-solid border-b-gray-200">
        <div className="max-w-screen-xl mx-auto flex justify-around">
          <div className="w-12">
            <img
              src="/logo.png"
              alt="Logotipo tableros visuales estilo trello"
            />
          </div>

          <nav className="my-2">
            {/* <Link to="/boards/create"> */}
              <button
                type="button"
                className="text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff] leading-[32px] px-4 rounded-md border-[#b2dcfc] hover:border-[#ebf5ff] border-2 border-solid cursor-pointer"
              >
                Crear
              </button>
            {/* </Link> */}
          </nav>
        </div>
      </header>
    </>
  );
}
