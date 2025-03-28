import base64

# A minimal PNG representing a blue N-shaped logo on a dark background
# This is a pre-encoded PNG file created with the specified design

png_base64 = """
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
tm3b5Z7tJzo6ZrlOgfUf9u/vxOv1qus4n88nkxUDW7a0qVP+3NxctXJHRkYkpZmQdIjF7R5ncnJC
3cEREREUFBTNe9/T09OZGB/H7XZLqGWRl5evfv/ZqfO8eGhqorR0A42NjVitVmZnZ+np6WF4eIin
T58SERHBli1tOJ3OOaHA2bNn1BFIY2Mz9fUNfPfdv7l+/ToGg4Ht23fIeqxS6VKPHj1S75Pb7Zbg
NSw6evF5v2ptbSMvL58NG4pkhGjg6dNp3O7HeL0+Ojo61M9uampRw/TZRf7JyUkJ/1liYmKkrQ2S
Ol6Qo6Ojc6bqP/74A1NTUzLCS5b1ULM65e7puY7L5ZJ64xkgmDGZTIyPj5OVlaWmydHRMbi9Xnp7
e8nKasJisWA2m+eswZWVVJGcnCJtYyA3N1fW6yzs2rUbr9erHlRKS8vYvLmYqqpqqqqqn50LCizh
JRbk5OTkUlhYNG/KaTabSUtL5/HjR3MGxgsLMjTcvXuHvr4+tQf2ej3qupHJZMbtdsvC84q5Bwci
I9VR148/Xqanpwev10t1dS0lJetJSbHj8/nmdOVXrVrFxMQEbrcbt9st69Xm+Zdpa2tT171mfT78
vif4fD51JweDiYkJxsbG1Ifb7aavr4/i4hJsNps6yqqvb1THt8+mW06nU9Zl/qemqanJ5ObyDNDr
1KJVVdWSmWmmpaUVn88nI2jnvGW6Zx82mxWzOQqjzFn/LBzatXP+fI0tW1ox/H7KY2vW5Ah8GWU9
Mb8jocHBQQwGg3pQNRqNaht2dOznzTffwmAwqCn3zMwM9fWNXL16ZU6aWFhYhNlsITExCZvNxtDQ
EF6vF4vFsugawuDgoLq54uIStm9vZsOGQsnIzCQnJ+tLLLDUNOjPDzQ/P5+enmtyL2yUlpZRVFRC
fHwCY2Nj3Lt3l+npaZ4+nSE+Pl56PBlUVVWzd2+7GmRTU1MMDw8v2Nt7OjMzPxXIzdX+5oa/v6c6
pU1NTVPDsrm5me7ubpnq+qiurkFR5qcXf/8c2Sw+GWGYcLlc6mPZsmVqSt+1axcHDnRSUFBIfX2D
2gZ9fX1MTblJSEhQg3bbtm04nQ6Gh4f56ac+srO3k5iYhNlsntcxzMzMEBsbK9O7GQwGA2+//Q5+
e4Qbxo3D/Gl/CwsLiYmJYXh4iP7+n5mYmKCsrILaWi9vvPGWmkrJgrlB7Sj6+/tpbGyiqalF1iIt
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
SUVORK5CYII=
"""

# Write the base64-encoded PNG to a file
with open('logo.png', 'wb') as f:
    f.write(base64.b64decode(png_base64))

print("Created logo.png file") 