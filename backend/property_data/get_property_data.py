{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "import requests\n",
    "import pandas as pd\n",
    "import os\n",
    "\n",
    "def request(postcode: str):\n",
    "    \n",
    "    try: \n",
    "        return requests.get(url=f'{os.environ.get('property_data_url')}{postcode}')\n",
    "    except Exception as error:\n",
    "        print(error)\n",
    "        return\n"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": ".venv",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "name": "python",
   "version": "3.11.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
