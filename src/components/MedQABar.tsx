


export default function MedQABar() {
    let no = 123;
    let correctness = false;

    return (
        <button>
            <span>{no}</span>
            <span>{correctness ? 'T' : 'F'}</span>
        </button>
    )
}