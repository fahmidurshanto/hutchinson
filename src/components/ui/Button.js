export default function Button({ children, ...props }) {
    return (
        <button
            className="w-full py-3 px-4 rounded-md font-bold text-gray-900 shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4"
            style={{
                background: 'linear-gradient(to right, #a0814c, #e0cd86, #a0814c)',
                border: '1px solid #c5af72',
            }}
            {...props}
        >
            {children}
        </button>
    );
}
