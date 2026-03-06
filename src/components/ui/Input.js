import { forwardRef } from 'react';

const Input = forwardRef(({ label, id, icon, ...props }, ref) => {
    return (
        <div className="w-full mb-6">
            <div className="relative">
                <input
                    ref={ref}
                    id={id}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-600 transition-colors text-gray-700 bg-white"
                    {...props}
                />
                {icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {icon}
                    </div>
                )}
            </div>
            {label && (
                <label htmlFor={id} className="block mt-1 text-sm font-medium" style={{ color: '#887b4b' }}>
                    {label}
                </label>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
