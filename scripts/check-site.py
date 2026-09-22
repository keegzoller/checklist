from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
import json,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parent.parent
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.ids=[];self.links=[];self.h1=0;self.canonical=[];self.title=False;self.form=False;self.feed(s)
 def handle_starttag(self,t,attrs):
  d=dict(attrs)
  if 'id' in d:self.ids.append(d['id'])
  if t=='h1':self.h1+=1
  if t=='title':self.title=True
  if t=='link' and d.get('rel')=='canonical':self.canonical.append(d['href'])
  if t in ['a','img','script','link']:
   v=d.get('href') or d.get('src')
   if v:self.links.append(v)
  if t=='form':
   self.form=True;assert d.get('data-netlify')=='true';assert d.get('netlify-honeypot')=='bot-field'
import re
pages=[root/'index.html',*root.glob('*/index.html')]
for p in pages:
 s=p.read_text();a=Page(s);assert a.h1==1,(p,'h1');assert len(a.ids)==len(set(a.ids)),(p,'duplicate ids');assert len(a.canonical)==1
 for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S):json.loads(b)
 for link in a.links:
  u=urlparse(link)
  if u.scheme or u.netloc:continue
  target=(root/u.path.lstrip('/')) if u.path.startswith('/') else p.parent/u.path
  if not u.path:target=p
  if target.is_dir():target=target/'index.html'
  assert target.exists(),(p,link,'missing target')
  if u.fragment and target.suffix=='.html':assert unquote(u.fragment) in Page(target.read_text()).ids,(p,link,'missing anchor')
 print('PASS',p.relative_to(root))
sitemap=ET.parse(root/'sitemap.xml');ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
for loc in sitemap.findall('.//s:loc',ns):
 assert urlparse(loc.text).netloc=='vermacconstruction.com'
 path=root/urlparse(loc.text).path.lstrip('/');assert path.exists()
print('PASS sitemap, schema, internal links, canonical URLs, and forms')
