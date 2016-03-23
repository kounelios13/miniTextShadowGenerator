class Point(object):
	"""Represents two coordinates(x,y)"""
	def __init__(self, x,y):
		self.x=x
		self.y=y
	def getCords(self):
		return [self.x,self.y]	
class Circle(object):
	"""Represents a circle object with a given radius and coordinates """
	def __init__(self,Point,radius):
		self.Point=Point
		self.radius=radius * 1.0
	def getCords(self):
		return self.point.getCords()
	def isInCircle(self,Point):
		return (self.Point.x-Point.x)**2 + (self.Point.y-Point.y)**2 <= self.radius**2	
favs=[]
c=Circle(Point(10,20),70)
p=Point(9,70)
##print(c.isInCircle(p))
#help(Point)
for i in range(0,100):
	favs.append(i)
index=favs[0]
def show_more():
	global favs,index
	total=len(favs)
	if index is total-1 or index is total:
		return
	diff=total-index
	print(favs[index:index+10 if diff > 9 else diff])
	index+=10 if diff > 9 else diff
def show_less():
	global index,favs
	if index is 0: return
	min_value=None
	if index > 9:
		min_value=(index)	- 10
	else:
		min_value=0	
	t=[]
	for i in range(index-1,min_value-1,-1):
		t.append(i)
	index=min_value	
	print("---------end of function----------\n")
	pass
def order():
	global index,favs
	if index is 0: return
	current_num=favs[index-1]
	min_value=None
	if index > 9:
		min_value=(index)	- 10
	else:
		min_value=0	
	t=[]
	for i in range(index-1,min_value-1,-1):
		t.append(i)
	index=min_value	
	print(t)
	print("\n\n")		
while(True):
	print("1:show more\n2:show less\n")
	ans=int(input("Answer::::"))
	if ans is not 1 and ans is not 2:
		print("Wrong number:\n")
		continue
	if ans is  1:	
		show_more()
	else:
		order()
		#show_less()					
print("-/|_-_-_Program terminated_-_-_|-\\\n")		