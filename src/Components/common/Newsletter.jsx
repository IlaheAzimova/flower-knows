import { useState } from 'react';

function Newsletter() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        // email regex - standart format yoxlamasi
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setError('Please enter your email');
            setSuccess(false);
            return;
        }
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setSuccess(false);
            return;
        }

        // ugurlu
        setError('');
        setSuccess(true);
        console.log('Signup:', email);
        setEmail('');
    };

    return (
        <>
            <img src="https://flowerknows.co/cdn/shop/files/20260528-162018.jpg?v=1779956629&width=1500" alt="Live your fairytales" className='w-full' />
            <div className="py-14 text-center px-4 bg-[#fbeaeb]">

                <h2 className="font text-[20px] tracking-[1.5px] text-[#505050] mb-3">Sign up for updates:</h2>
                <p className="dmsans text-[15px] tracking-[1.5px] text-[#505050bf] mb-6">
                    Be the first to know about new collections and exclusive offers!
                </p>

                <div className="max-w-[420px] mx-auto">
                    <div className={`flex border-b ${error ? 'border-[#d9534f]' : 'border-[#a9a9aa]'}`}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            placeholder="Enter email here"
                            className="flex-1 bg-transparent dmsans text-[14px] text-[#717171] py-2 outline-none placeholder:text-[#999]"
                        />
                        <button
                            onClick={handleSubmit}
                            className="dmsans uppercase text-[13px] tracking-[2px] text-[#999] px-3 hover:text-[#c78a99] transition"
                        >
                            →
                        </button>
                    </div>

                    {/* xeta mesaji */}
                    {error && (
                        <p className="dmsans text-[12px] text-[#d9534f] mt-2 text-left">{error}</p>
                    )}

                    {/* ugur mesaji */}
                    {success && (
                        <p className="dmsans text-[12px] text-[#5ca85c] mt-2 text-left">
                            Thank you for subscribing!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Newsletter;