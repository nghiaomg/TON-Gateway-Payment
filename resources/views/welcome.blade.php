<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        body{
            background: url('https://cdn.wallpapersafari.com/33/34/lMeVzG.jpg');
            background-repeat: no-repeat;
            background-size: cover;
        }
    </style>

</head>
<body>

    <div class="w-full h-screen font-sans bg-cover bg-landscape">
        <div class="container flex items-center justify-center flex-1 h-full mx-auto">
            <div class="w-full max-w-lg">
                <div class="leading-loose">
                    <div class="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25">
                        <p class="mb-8 text-2xl font-light text-center text-white">
                            Create Wallet
                        </p>
                        <div class="mb-2">
                            <div class="mb-2">
                                <div class=" relative ">
                                    <input type="text" disabled class="cursor-pointer rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Địa chỉ ví" />
                                </div>
                            </div>
                            <div class="flex items-center justify-between mt-4">
                                <button type="submit" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Tạo ví
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</body>
</html>