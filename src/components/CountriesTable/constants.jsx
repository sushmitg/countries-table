
const tableColumns = [
    {
        accessorKey: "name",
        header: "Country Name",
    },
    {
        accessorKey: "abbreviation",
        header: "Code",
    },
    {
        accessorKey: "capital",
        header: "Capital",
    },
    {
        accessorKey: "phone",
        header: "Ph Code",
    },
    {
        accessorKey: "population",
        header: "Population",
    },
    {
        accessorKey: "media.flag",
        header: "Flag",
        cell: (info) => (
            <img src={info.getValue()} alt="flag" style={{ height: "30px" }} />
        ),
    },
    {
        accessorKey: "media.emblem",
        header: "Emblem",
        cell: (info) => (
            <img src={info.getValue()} alt="emblem" style={{ height: "30px" }} />
        ),
    },
];


export default tableColumns;